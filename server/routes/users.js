var express = require('express');
var router = express.Router();
const user = require('../controller/user')

router.post('/login', user.login);
router.post('/register', user.register);
router.post('/logout', user.logout);


module.exports = router;
