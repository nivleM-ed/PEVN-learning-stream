//USER AUTHENTICATION

let LocalStrategy = require('passport-local').Strategy;
let models = require('./models');
let bcrypt = require('bcrypt');

const validPassword = function(user, password) {
    return bcrypt.compareSync(password, user.password)
}

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        return done(null, user.id)
    });

    passport.deserializeUser(function (id, done) {
        models.users.findOne({
            where: {
                'id': id
            }
        }).then(user => {
            if(user == null) {
                return done(new Error('Cannot find user'))
            }
            return done(null, user);
        })
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function(req, username, password, done) {
            return models.users.findOne({
                where: {
                    'username': username
                }
            }).then( user => {
                if (user == null) {
                    return done(null, false, {'err': 'noUserExist'})
                } else if (user.password == null || user.password == undefined) {
                    return done(null, false, {'err':'pwdProblem'})
                } else if (!validPassword(user, password)) {
                    return done(nuill, false, {'err': 'wrongPassword'})
                }
                return done(null, user)
            }).catch(err => {
                done(err, false)
            })
        }
            
    ))
}