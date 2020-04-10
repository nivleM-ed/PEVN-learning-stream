let models = require('../models');
let bcrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
const {
    isEmpty
} = require('lodash');
const {
    validateUser
} = require('../validators/signup');
var sequelize = require('sequelize')
var op = sequelize.Op;

const generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

exports.login = function (req, res, next) {
    passport.authenticate('local', {
        session: true
    }, function (err, user, info) {
        if (err) {
            res.send(err)
        } else if (!user) {
            res.send(info)
        } else {
            req.logIn(user, function (err) {
                res.send(user)
            })
        }
    })(req, res, next)
}

exports.register = function (req, res, next) {
    let errors = {};
    return validateUser(errors, req).then(errors => {
        if (!isEmpty(errors)) {
            res.send(errors)
        } else {
            newUser = models.users.build({
                username: req.body.userObj._username,
                password: generateHash(req.body.userObj._password),
            });
            return newUser.save().then(result => {
                setNewUser(result)
                res.status(200).send(result)
            }).catch(err => {
                res.send(err)
            })
        }
    })
}

exports.logout = function (req, res, next) {
    try {
        req.logout();
        req.session.destroy();

        res.status(200).send({
            logout: 'succesfully logout'
        })
    } catch (err) {
        res.send(err)
    }
}

const setNewUser = (data) => {
    const setExpenses = (data) => {
        return new Promise((resolve, reject) => {
            return models.expenses.create({
                user_id: data.id
            }).then(expUser => {
                resolve(expUser)
            }).catch(err => {
                reject(err)
            })
        })
    }

    Promise.all([setExpenses(data)])
        .then(result => {
            console.log("succesfully create tables for new user")
        }).catch(err => {
            console.log(err)
        })
}