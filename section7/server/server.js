const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

const PORT = 3000;

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
    .then((doc) => {
      resp.send(doc);
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
    return resp.status(400).send('Invalid todo ID')
  };
  Todo.findById(id).then(doc => {
    if (!doc) {
      return resp.status(404).send('Todo item not found');
    };
    resp.send(doc);
  }).catch(err => resp.status(400).send(err));
});


app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`)
})

module.exports = {app};
