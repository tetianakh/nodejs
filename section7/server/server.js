const express = require('express');
const bodyParser = require('body-parser');

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
      console.log(doc);
      resp.send(doc);
    }).catch( (err) => {
      console.log('Failed to save todo');
      resp.status(400).send(err);
    });
});



app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`)
})
