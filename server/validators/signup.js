let models = require('../models');
let validator = require('validator');

const validateCreateUserFields = function(errors, req) {
    if(!validator.isAscii(req.body.userObj._password)) {
        errors["password"] = "Invalids characters";
    }
    if(!validator.isLength(req.body.userObj._password, {min: 6})) {
        errors["password"] = "Password too short"
    }
}

exports.validateUser = function(errors, req) {
    return new Promise(function(resolve, reject) {
        return models.users.findOne({
            where: {
                username: req.body.userObj.req_username
            }
        }).then(user => {
            if(user !== null) {
                error["err"] = "usernameInUsed";
            }
            resolve(errors);
        }).catch(err => {
            resolve(err)
        })
    })
}