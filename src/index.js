const express = require('express');
const Storage = require('./entityStorage');
const configureEntityController = require('./entityController');

const app = express();
const storage = new Storage('storage');
storage.configure();

app.use(express.json())

configureEntityController(app, storage);

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
