const express = require('express');

const app = express();

// set up route for index
app.get('/', (request, response) => {
  response.send("Hello express!")
});

app.listen(3000);
