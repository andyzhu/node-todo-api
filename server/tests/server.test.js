const _expect = require('expect');
const _request = require('supertest');
const {ObjectID} = require('mongodb');

const {_app} = require('./../server');
const {_Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'first test doto'
},
{
    _id: new ObjectID(),
    text: 'Secons test doto',
    completed: true,
    completedAT: 333
}]

beforeEach((done) => {
    _Todo.remove({})
        .then(() => {
            _Todo.insertMany(todos);
        }).then(() => {
            done();
        });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test to do entry';

        _request(_app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                _expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                _Todo.find({text}).then((todos) => {
                    _expect(todos.length).toBe(1);
                    _expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should not create an empty todo', (done) => {
        var text = '';
        _request(_app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                _Todo.find().then((todos) => {
                    _expect(todos.length).toBe(2);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
   
    });
});

describe('GET /todos', () => {
    it('should return all the  todos', (done) => {
        _request(_app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                _expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });


});

describe('GET /todos/:id', () => {
    it('should return a specific todo', (done) => {
        _request(_app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                _expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return blank when id not exist', (done) => {
        var _id = new ObjectID().toHexString();
        _request(_app)
            .get(`/todos/${_id}`)
            .expect(404)
            // .expect((res) => {
            //     _expect(res.body).toBe('Not Exist');
            // })
            .end(done);
    });

    it('should return 404 when id not accurate', (done) => {
        _request(_app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });


});

describe('Delete /todos/:id', () => {
    it('should return a specific todo', (done) => {
        var hexId = todos[0]._id.toHexString()
        _request(_app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                _expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                _Todo.findById(hexId).then((todo) => {
                    // _expect(todo).toNotExist();
                    _expect(todo).toBeFalsy();
                    done();
                }).catch((e)=> {
                    done(e);
                });
             });
    });

    it('should return blank when id not exist', (done) => {
        var _id = new ObjectID().toHexString();
        _request(_app)
            .delete(`/todos/${_id}`)
            .expect(404)
            // .expect((res) => {
            //     _expect(res.body).toBe('Not Exist');
            // })
            .end(done);
    });

    it('should return 404 when id not accurate', (done) => {
        _request(_app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
    });


});

describe('Patch /todos/:id', () => {
    it('Should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var _text = 'update from the test';
        _request(_app)
            .patch(`/todos/${hexId}`)
            .send({
                text: _text,
                completed:true
            })
            .expect(200)
            .expect((res) => {
                _expect(res.body.todo.text).toBe(_text);
                _expect(res.body.todo.completed).toBe(true);
                _expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
                // _Todo.findById(hexId).then((todo) => {
                //     // _expect(todo).toNotExist();
                //     _expect(todo).toBeFalsy();
                //     done();
                // }).catch((e)=> {
                //     done(e);
                // });
             });
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var _text = 'reset completed to be false';
        _request(_app)
            .patch(`/todos/${hexId}`)
            .send({
                text: _text,
                completed: false
            })
            .expect(200)
            .expect((res) => {
                _expect(res.body.todo.text).toBe(_text);
                _expect(res.body.todo.completed).toBe(false);
                _expect(res.body.todo.completedAt).toBeFalsy();
            })
            .end(done);
    });
});