
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');


beforeEach( done => {
  Todo.remove({}).then(() => done());
});

describe('/todos POST', () => {

  it('should create a new todo item', (done) => {
    const text = 'test todo';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((resp) => {
        expect(resp.body.todo.text).toBe(text)
      }).end( (err, resp) => {
        if (err) {
          return done(err);
        }
        Todo.find({}).then( (todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(e => done(e));
      })

  });

  it('should not save empty todo items', (done) => {
    request(app).post("/todos")
      .send({})
      .expect(400)
      .expect( (resp) => {
        expect(resp.body.name ).toBe('ValidationError');
      }).end( (err, resp) => {
        Todo.find({}).then(todos => {
          expect(todos.length).toBe(0);
        }).catch(e => done(e));
        done();
      });

  })
})

describe('/todos GET', () => {

  const todos = [
    {text: "test text 1"},
    {text: "test text 2"}
  ]
  beforeEach( done => {
    Todo.insertMany(todos).then( () => done());
  })

  it('should fetch todos from db', (done) => {

    request(app)
      .get('/todos')
      .expect(200)
      .expect( (resp) => {
        expect(resp.body.todos.length).toBe(2)
      })
      .expect( (resp) => {
        expect(resp.body.todos[0].text).toEqual(todos[0].text)
      })
      .expect( (resp) => {
        expect(resp.body.todos[1].text).toEqual(todos[1].text)
      }).end(done)

  })

})

describe('/todos/:id GET', () => {
  const _id = new ObjectID();
  beforeEach( done => {
    const todo = Todo({text: "test text 1", _id: _id});
    todo.save().then( () => done());
  });

  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${_id}` )
      .expect(200)
      .expect(resp => {
        expect(resp.body.todo.text).toBe("test text 1")
      })
      .end(done);
  });

  it('should return 404 if doc not found', (done) => {
    const otherId = new ObjectID();
    request(app)
      .get(`/todos/${otherId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if id is invalid', (done) => {
    request(app)
      .get('/todos/catdog')
      .expect(404)
      .end(done);
  });

});


describe('/todos/:id DELETE', () => {
  const todo = Todo({text: "test text 1"});
  beforeEach( done => {
    todo.save().then( () => done());
  });

  it('should delete todo by ID', (done) => {
    request(app)
      .delete(`/todos/${todo._id}`)
      .expect(200)
      .expect(resp => {
        expect(resp.body.todo._id).toBe(todo._id.toHexString());
      })
      .end((err, resp) => {
        if (err) {
          return done(err);
        }
        Todo.findById(todo._id).then(doc => {
          expect(doc).toNotExist();
          done();
        }).catch(err => done(err));
      });
  });
  it('should return 404 if doc not found', (done) => {
    const otherId = new ObjectID();
    request(app)
      .delete(`/todos/${otherId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if id is invalid', (done) => {
    request(app)
      .delete('/todos/catdog')
      .expect(404)
      .end(done);
  });
});


describe('/todos/:id PATCH', () => {
  const todo = Todo({text: "test text 1"});
  const completedTodo = Todo({
    'text': 'test',
    'completed': true,
    'completedAt': 333
  })
  beforeEach( done => {
    Todo.insertMany([todo, completedTodo]).then(() => done());
  });

  it('should set completedAt property when completing todo', (done) => {
    request(app)
      .patch(`/todos/${todo._id}`)
      .send({'completed': true})
      .expect(200)
      .end((err, resp) => {
        if (err) {
          return done(err);
        };
        Todo.findById(todo._id).then(doc => {
          expect(doc.completed).toBe(true);
          expect(doc.completedAt).toExist();
          done();
        }).catch(err => done(err));
      });
  });

  it('should clear completedAt when setting complete to false', (done) => {
    request(app)
      .patch(`/todos/${completedTodo._id}`)
      .send({'completed': false})
      .expect(200)
      .end((err, resp) => {
        if (err) {
          return done(err);
        };
        Todo.findById(completedTodo._id).then(doc => {
          expect(doc.completed).toBe(false);
          expect(doc.completedAt).toNotExist();
          done();
        }).catch(err => done(err));
      });
  });

});
