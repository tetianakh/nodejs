const express = require('express');

const app = express();

app.get('/', (req, resp) => {
  return resp.send({
      error: 'Page not found.',
      version: "0.1.2"
  });
});

app.get('/users', (req, resp) => {
  return resp.send([{
      name: 'Foka',
      age: 28,
    }, {
      name: 'Koala',
      age: 31
    }])
})

app.listen(3000);

module.exports.app = app;
