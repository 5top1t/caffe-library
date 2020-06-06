/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const bookRouter = require('./routes/book');
const reviewRouter = require('./routes/review');

const app = express();
const apiPort = 3000;


app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/review', reviewRouter);
app.use('/api/book', bookRouter);


app.listen(apiPort, () => {
  console.log(`[React Caffe-Library] - Server running on port ${apiPort}`);
});