const express = require('express');
const hbs = require('hbs');
const app = express();


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, resp) => {
  resp.render('home.hbs', {
    pageTitle: 'Landing Page',
    welcomeMessage: "Hello world!",
  });
});

app.get('/about', (req, resp) => {
  resp.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, resp) => {
  resp.send({errorMessage: 'Unable to fulfill request'});
});

app.listen(3000);
