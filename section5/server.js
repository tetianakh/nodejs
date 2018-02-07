const express = require('express');
const hbs = require('hbs');
const app = express();

const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use( (req, resp, next) => {
  const log = `${new Date().toString()}: ${req.method} ${req.url}`
  console.log(log);
  next();
});

// app.use( (req, resp, next) => {
//   resp.render('maintenance.hbs');
// });

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

app.get('/projects', (req, resp) => {
  resp.render('projects.hbs', {pageTitle: 'My Projects'});
});

app.get('/bad', (req, resp) => {
  resp.send({errorMessage: 'Unable to fulfill request'});
});

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
