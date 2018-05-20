var _express = require('express');
var _bodyparser = require('body-parser');
var {ObjectID} = require('mongodb');

var {_mongoose} = require('./db/mongoose');
var {_Todo} = require('./models/todo.js');
var {_User} = require('./models/user.js');

var _app = _express();

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
        return res.status(404).send('Invbalid ID');
    }
    
    _Todo.findById(_id).then((todo) => {
        if (!todo) {
           return res.status(404).send();
        }

        res.status(200).send({todo});
    }, (e) => {
        return res.status(404).send({});
    }).catch((e) => {
        res.status(400).send();
    });

});

_app.listen(3000, () => {
    console.log ('started on port 3000');
});

module.exports = {_app};