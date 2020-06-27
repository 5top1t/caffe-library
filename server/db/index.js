const mongoose = require('mongoose');

const URI =
  process.env.NODE_ENV === 'development'
    ? `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongo/${process.env.DB_NAME}`
    : 'mongodb+srv://cscl:mongo@cluster0-wgigp.mongodb.net/cscl?retryWrites=true&w=majority';
   
mongoose
  .connect(URI,
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