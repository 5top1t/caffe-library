/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const bookRouter = require('./routes/book');
const reviewRouter = require('./routes/review');

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0'


app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use((req, res, next) => {
  var allowedOrigin = 'http://beantowncafe.io';
  var origin = req.headers.origin;
  if(allowedOrigin === origin){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
})
app.use('/api/review', reviewRouter);
app.use('/api/book', bookRouter);


app.listen(PORT, HOST, () => {
  console.log(`[React Bean-Café API] - Server running on port ${PORT}`);
});