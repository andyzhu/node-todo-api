const _mongoose = require('mongoose');
const _validator = require('validator');
const _jwt = require('jsonwebtoken');
const _ = require('lodash');
const _bcrypt = require('bcryptjs');

var _UserSchema = new _mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            minlength: 1,
            trim: true,
            unique: true,
            validate: {
                // validator: (value) => {
                //     return _validator.isEmail(value);
                // },
                validator: _validator.isEmail,
                message: '{VALUE} is not a valid email'
    
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]
    }
);

_UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id','email']);
};

_UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';

    var token = _jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens = user.tokens.concat([{access,token}]);
    return user.save().then(() => {
        return token
    })
};

_UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = _jwt.verify(token, 'abc123');
    } catch(e) {
        // return new Promise((resolved,reject)=> {
        //     reject();
        // })
        return Promise.reject();
    };
    
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'

    });

};

_UserSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        _bcrypt.genSalt(10, (err, salt) => {
            _bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
        
    } else {
        next();
    }
});

var _User = _mongoose.model('User', _UserSchema);

module.exports = {_User};