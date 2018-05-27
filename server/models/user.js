const _mongoose = require('mongoose');
const _validator = require('validator');


var _User = _mongoose.model('User', {
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
});

module.exports = {_User};