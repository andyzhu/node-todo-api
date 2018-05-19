var {_mongoose} = require('./db/mongoose.js');


var newuser = new User({
    email: 'an@bc.comh'
});

newuser.save().then( (record) => {
    console.log ('Insert successfully', record)
}, (e) => {
    console.log ('error: ', e)
});