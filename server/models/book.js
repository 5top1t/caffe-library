/**
 * Book Model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
    isbn: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    publication_year: { type: Number, required: true },
    publisher: { type: String},
    image_url_s: { type: String},
    image_url_m: { type: String},
    image_url_l: { type: String},
    copies: { type: Number, required: true},
    available: { type: Number, required: true}
});


// book validation
Book.pre("save", function(next) {
    var self = this;
    var min_publication_year = 1600;

    if (this.publication_year < min_publication_year || this.publication_year > new Date().getFullYear()) {
        self.invalidate("available", "There are no copies available");
        return next(new CustomError("There are no copies available"));
    }
    if (this.available < 0) {
        self.invalidate("available", "There are no copies available");
        return next(new CustomError("There are no copies available"));
    }
    if (this.copies < 0) {
        self.invalidate("copies", "Database cannot hold negative copies");
        return next(new CustomError("Database cannot hold negative copies"));
    }
    if (this.available > this.copies) {
        self.invalidate("available", "Available exceeds copies");
        return next(new CustomError("Available exceeds copies"));
    }
    next();
});

Book.post('findOne', function(res, next) {
    if (!res) {
      return next(new CustomError('Book not found!'));
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

module.exports = mongoose.model('books', Book);