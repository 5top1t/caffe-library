const mongoose = require('mongoose');

mongoose
  .connect('mongodb://cscl:mongo@127.0.0.1:2717/cscl', { useNewUrlParser: true, useUnifiedTopology: true})
  .catch(e => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

module.exports = db;