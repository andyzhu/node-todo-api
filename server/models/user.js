var _mongoose = require('mongoose');

var _User = _mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

module.exports = {_User};