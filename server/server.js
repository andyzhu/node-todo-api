var _express = require('express');
var _bodyparser = require('body-parser');

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

_app.listen(3000, () => {
    console.log ('started on port 3000');
});

module.exports = {_app};