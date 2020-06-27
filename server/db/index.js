const mongoose = require('mongoose');

// mongoose
//   .connect('mongodb://cscl:mongo@127.0.0.0:2717/cscl', { useNewUrlParser: true, useUnifiedTopology: true})
//   .catch(e => {
//     console.error('Connection error', e.message);
//   });

mongoose
  .connect('mongodb://cscl:mongo@mongo/cscl', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(e => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

module.exports = db;