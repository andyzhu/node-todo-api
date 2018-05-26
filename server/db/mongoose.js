var _mongoose = require('mongoose');

_mongoose.Promise = global.Promise;
console.log(process.env.MONGODB_URI);
_mongoose.connect(process.env.MONGODB_URI);



module.exports = {_mongoose};