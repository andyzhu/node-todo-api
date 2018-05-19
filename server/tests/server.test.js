const _expect = require('expect');
const _request = require('supertest');

const {_app} = require('./../server');
const {_Todo} = require('./../models/todo');

beforeEach((done) => {
    _Todo.remove({})
        .then(() => {
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

                _Todo.find().then((todos) => {
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
                    _expect(todos.length).toBe(0);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
   
    });
});