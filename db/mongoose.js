var _mongoose = require('mongoose');

_mongoose.Promise = global.Promise;

_mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {_mongoose};