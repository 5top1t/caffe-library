const express = require('express');

const BookController = require('../controllers/book');

const router = express.Router();

router.get('/', BookController.getBooks);
router.get('/query', BookController.queryBooks);
router.get('/:isbn', BookController.getBookByIsbn);
router.post('/', BookController.createBook);
router.put('/rent/:isbn', BookController.rentBook);
router.put('/return/:isbn', BookController.returnBook);
/* router.delete('/:isbn', BookController.deleteBook); */


module.exports = router;
