var {_User} = require('./../models/user');


var _authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    
    _User.findByToken(token)
        .then((user) => {
            if (!user) {
                return Promise.reject();
            }

            req.user = user;
            req.token = token;
            next();
        }).catch ((e) => {
            res.status(401).send();
        })
}

module.exports = {_authenticate};