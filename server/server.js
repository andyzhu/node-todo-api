require('./config/config');

const _ = require('lodash');
var _express = require('express');
var _bodyparser = require('body-parser');
var {ObjectID} = require('mongodb');

var {_mongoose} = require('./db/mongoose');
var {_Todo} = require('./models/todo.js');
var {_User} = require('./models/user.js');
var {_authenticate} = require('./middleware/authenticate');

var _app = _express();
const port = process.env.PORT;

_app.use(_bodyparser.json());

_app.post('/todos', (req, res) => {
    var todo = new _Todo ({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

_app.get('/todos', (req,res) => {
    _Todo.find().then((todos) => {
        res.send({
            todos
        });

    }, (e) => {
        res.status(400).send(e);
    })
});

_app.get('/todos/:id', (req, res) =>{
    var _id = req.params.id;
    //res.send(_id);

    if(!(ObjectID.isValid(_id))) {
        // console.log(res.body);
        res.status(404).send('Invalid ID');
        
    }
    
    _Todo.findById(_id).then((todo) => {
        if (!todo) {
            
            res.status(404).send({
                failedReason: 'Not Exist'
            });
            // console.log(res);
        }

        res.status(200).send({todo});
    }, (e) => {
        res.status(404).send({});
    }).catch((e) => {
        res.status(400).send();
    });

});

_app.delete('/todos/:id', (req, res) =>{
    var _id = req.params.id;
    //res.send(_id);

    if(!(ObjectID.isValid(_id))) {
        // console.log(res.body);
        res.status(404).send('Invalid ID');
        
    }
    
    _Todo.findByIdAndDelete(_id).then((todo) => {
        if (!todo) {
            
            res.status(404).send({
                failedReason: 'Not Exist'
            });
            // console.log(res);
        }

        res.status(200).send({todo});
    }, (e) => {
        res.status(404).send({});
    }).catch((e) => {
        res.status(400).send();
    });

});

_app.patch('/todos/:id', (req,res) => {
    var _id = req.params.id;
    var _body = _.pick(req.body,['text','completed']);
    
    

    if(!(ObjectID.isValid(_id))) {
        // console.log(res.body);
       return res.status(404).send('Invalid ID');
        
    }
    
    if(_.isBoolean(_body.completed) && _body.completed) {
        _body.completedAt = new Date().getTime();
    } else {
        _body.completed = false;
        _body.completedAt = null;
    }

    _Todo.findByIdAndUpdate(_id, {$set: _body}, {new: true}).then((todo) => {
        if (!todo) {
            
            return res.status(404).send({
                failedReason: 'Not Exist'
            });
            // console.log(res);
        }

        res.status(200).send({todo});
    }).catch((e) => {
        return res.status(404).send();
    });

});


_app.post('/users', (req, res) => {

    var _userbody = _.pick(req.body, ['email', 'password']);
    

    var user = new _User (_userbody);

    user.save().then((user) => {
         return user.generateAuthToken();
        // res.send(user);
    }, (e) => {
        res.status(400).send(e);
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});



_app.get('/users/me', _authenticate, (req,res) => {
    res.send(req.user);
    
})

_app.listen(port, () => {
    console.log (`started on port ${port}`);
});

module.exports = {_app};