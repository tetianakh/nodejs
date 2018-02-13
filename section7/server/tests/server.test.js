const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todo');


beforeEach( done => {
  Todo.remove({}).then(() => done());
});

describe('/todos POST', () => {

  it('should create a new todo item', (done) => {
    const text = 'test todo';

    request(app).post('/todos')
      .send({text})
      .expect(200)
      .expect((resp) => {
        expect(resp.body.text).toBe(text)
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
