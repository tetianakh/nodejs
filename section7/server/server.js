require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');


const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');
const {authenticate} = require('./middleware/authenticate');

const PORT = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json())

app.get('/', (req, resp) => {
  resp.send('Hello');
});

app.post('/todos', authenticate, (req, resp) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id,
  });
  todo.save()
    .then((todo) => {
      resp.send({todo});
    }).catch( (err) => {
      resp.status(400).send(err);
    });
});

app.get('/todos', authenticate, (req, resp) => {
  Todo.find({_creator: req.user._id}).then( todos => {
    resp.send({todos});
  }).catch( err => {
    resp.status(400).send(err);
  })
})

app.get('/todos/:id', authenticate, (req, resp) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return resp.status(404).send('Invalid todo ID');
  };
  Todo.findOne({_id: id, _creator: req.user._id}).then(todo => {
    if (!todo) {
      return resp.status(404).send('Todo item not found');
    };
    resp.send({todo});
  }).catch(err => resp.status(400).send(err));
});

app.delete('/todos/:id', authenticate, (req, resp) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return resp.status(404).send('Invalid todo ID');
  };
  Todo.findOneAndRemove({_id: id, _creator: req.user._id}).then(todo => {
    if (!todo) {
      return resp.status(404).send();
    };
    return resp.send({todo});
  }).catch(err => resp.status(400).send(err))
})

app.patch('/todos/:id', authenticate, (req, resp) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(
    {_id: id, _creator: req.user._id},
    {$set: body},
    {new: true},
  ).then(todo => {
    if (!todo) {
      return resp.status(404).send();
    }
    resp.send({todo});
  }).catch(e => resp.status(400).send());
});

app.post('/users', (req, resp) => {
  const body = _.pick(req.body, ['email', 'password'])
  const user = new User(body);
  user.save()
    .then(() => {
      return user.generateAuthToken()
    })
    .then((token) => {
      resp.header('x-auth', token).send(user);
    })
    .catch(err => resp.status(400).send(err));
})


app.get('/users/me', authenticate, (req, resp) => {
  resp.send(req.user);
})

app.post('/users/login', (req, resp) => {
  const body = _.pick(req.body, ['email', 'password'])
  User.findByCredentials(body.email, body.password).then(user => {
      return user.generateAuthToken().then(token => {
        resp.header('x-auth', token).send(user);
      });
    }).catch(e => {
      resp.status(400).send();
    })
});

app.delete('/users/me/token', authenticate, (req, resp) => {
  req.user.removeToken(req.token).then( () => {
    resp.status(200).send();
  }, (e) => {
    resp.status(400).send(e);
  });
});

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`)
});

module.exports = {app};
