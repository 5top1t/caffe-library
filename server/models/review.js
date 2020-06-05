/**
 * Book Reviews Model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = require('./book');

const Review = new Schema({
    isbn: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    date: { type : Date, default: Date.now }
});

Review.pre('save', function(next) {
    var self = this;
    Book.findOne({ isbn: self.isbn }).then(book => {
      //console.log({book})
      if (!book) {
        return next(new CustomError('Book review cannot be store for a book not in our collection.'));
      }
    }).catch(error => {
      return next('Pre review save, isbn find.catch error');
    });

    if (self.rating < 0 || self.rating > 5) {
      return next(new CustomError('Book rating must be 1-5.'));
    }
    next();
}); 

function CustomError(message) {
  this.name = 'CustomError';
  this.message = message || '';
  var error = new Error(this.message);
  error.name = this.name;
  this.stack = error.stack;
}

module.exports = mongoose.model('reviews', Review);