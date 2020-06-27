const mongoose = require('mongoose');

// Replace URI with 'mongodb://cscl:mongo@mongo/cscl' on dev
mongoose
  .connect(
    'mongodb+srv://cscl:mongo@cluster0-wgigp.mongodb.net/cscl?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .catch(e => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

module.exports = db;