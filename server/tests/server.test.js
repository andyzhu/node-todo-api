const _expect = require('expect');
const _request = require('supertest');

const {_app} = require('./../server');
const {_Todo} = require('./../models/todo');

const todos = [{
    text: 'first test doto'
},
{
    text: 'Secons test doto'
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