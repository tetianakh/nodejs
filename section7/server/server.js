require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');


const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

const PORT = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json())

app.get('/', (req, resp) => {
  resp.send('Hello');
});

app.post('/todos', (req, resp) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save()
    .then((todo) => {
      resp.send({todo});
    }).catch( (err) => {
      resp.status(400).send(err);
    });
});

app.get('/todos', (req, resp) => {
  Todo.find({}).then( todos => {
    resp.send({todos});
  }).catch( err => {
    resp.status(400).send(err);
  })
})

app.get('/todos/:id', (req, resp) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return resp.status(404).send('Invalid todo ID');
  };
  Todo.findById(id).then(todo => {
    if (!todo) {
      return resp.status(404).send('Todo item not found');
    };
    resp.send({todo});
  }).catch(err => resp.status(400).send(err));
});

app.delete('/todos/:id', (req, resp) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return resp.status(404).send('Invalid todo ID');
  };
  Todo.findByIdAndRemove(id).then(todo => {
    if (!todo) {
      return resp.status(404).send();
    };
    return resp.send({todo});
  }).catch(err => resp.status(400).send(err))
})

app.patch('/todos/:id', (req, resp) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then(todo => {
    if (!todo) {
      return resp.status(404).send();
    }
    resp.send({todo});
  }).catch(e => resp.status(400).send());
});


app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`)
})

module.exports = {app};
