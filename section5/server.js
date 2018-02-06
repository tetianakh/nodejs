const express = require('express');
const hbs = require('hbs');
const app = express();


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))

// set up route for index
app.get('/', (req, resp) => {
  resp.render('home.hbs', {
    pageTitle: 'Landing Page',
    year: new Date().getFullYear(),
    welcomeMessage: "Hello world!",
  });
});

app.get('/about', (req, resp) => {
  resp.render('about.hbs', {
    pageTitle: 'About Page',
    year: new Date().getFullYear(),
  });
});

app.get('/bad', (req, resp) => {
  resp.send({errorMessage: 'Unable to fulfill request'});
});

app.listen(3000);
