const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'))

// set up route for index
app.get('/', (request, response) => {
  response.send({
    name: 'Andrew',
    likes: ['bikes', 'cities'],
  })
});

app.get('/about', (req, resp) => {
  resp.send('About page');
});

app.get('/bad', (req, resp) => {
  resp.send({errorMessage: 'Unable to fulfill request'});
});

app.listen(3000);
