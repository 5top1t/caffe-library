const express = require('express');

const ReviewController = require('../controllers/review');

const router = express.Router();

router.get('/:isbn', ReviewController.getReviewsByIsbn);
router.get('/rating/:isbn', ReviewController.getRatingByIsbn);
router.post('/', ReviewController.createReview);
router.delete('/:id', ReviewController.deleteReviewById);
router.delete('/reviews', ReviewController.deleteAllReviews);

module.exports = router;