var _mongoose = require('mongoose');

_mongoose.Promise = global.Promise;

_mongoose.connect(process.env.MONGODB_URI);

module.exports = {_mongoose};