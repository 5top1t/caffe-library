const Review = require('../models/review');

/*
  Check if request has a body
*/
checkBody = function(req, res) {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: 'You must provide an review.',
    });
  }
}

/*
  check if request has id
*/
checkId = function(req, res) {
  if (!req.params.id) {
    return res.status(400).json({
      success: false,
      message: 'You must provide an id',
    });
  }
} 

/*
  check if request has isbn
*/
checkIsbn = function(req, res) {
  if (!req.params.isbn) {
    return res.status(400).json({
      success: false,
      message: 'You must provide an isbn',
    });
  }
} 

/*
  getReviewsByIsbn
  input: isbn number
  return: returns a review
*/
getReviewsByIsbn = async (req, res) => {
  checkIsbn(req, res);
  await Review.find({isbn: req.params.isbn}).then(function(reviews) {
      return res
        .status(200)
        .json({
          success: true,
          data: reviews,
        });
    }).catch(error => {  
        console.log({msg: 'err', error});  
        return res.status(400).json({
            success: false,
            error,
            message: 'Error occured!'
        });
      }
    );
};

/*
  getRatingByIsbn
  input: isbn number
  return: returns a rating, count
*/
getRatingByIsbn = async (req, res) => {
  checkIsbn(req, res);
  await Review.aggregate(
     [
        { $match : { isbn :  req.params.isbn} },
        {
          $group:
            {
              _id: "$isbn",
              rating: { $avg:  "$rating" },
              count: { $sum: 1 }
            }
        }
      ]
    ).then(function(result) {
      var rating = 0;
      var count = 0;
      if (result.length) {
        rating = result[0].rating;
        count = result[0].count;
      }
      return res
        .status(200)
        .json({
          success: true,
          count,
          rating
        });
    }).catch(error => {  
      console.log({msg: 'err', error});  
      return res.status(400).json({
          success: false,
          error,
          message: 'Error occured!'
        });
      }
    );
};



/*
  createReview
  input: expects a review
  return: returns the created review
*/
createReview = (req, res) => {
  checkBody(req, res);
  const review = new Review(req.body);
  review
    .save()
    .then(function() {
      return res.status(201).json({
        success: true,
        id: review._id,
        isbn: review.isbn,
        message: 'Review created!',
      });
    })
    .catch(error => {
      console.log({msg: 'err', error});
      return res.status(400).json({
        success: false,
        error,
        message: 'Error occured!'
      });
    });
};

/*
  deleteReview
  input: id
  return: returns the delete review
*/
deleteReviewById = async (req, res) => {
  checkId(req, res);
  await Review.findOneAndDelete({ _id: req.params.id }).then(function(review) {
    return res.status(200)
      .json({
        success: true,
        available: review.available,
        message: 'Review Deleted!',
      });
    }).catch(error => {     
        return res.status(400).json({
            success: false,
            error,
            message: 'Error occured!'
          });
        }
      );
};

/**
 * DELETE PRIOR TO DEPLOYMENT
 * 
 * Development route
 * to clear all review
 */
deleteAllReviews = async (req, res) => {
  await Review.find({}).then(allReviews => {
    let i = 0;
    for (i = 0;i < allReviews.length; i++) {
      Review.deleteMany({ _id: allReviews[i].id }).exec().catch;
    }
    return res.status(200)
      .json({
        success: true,
        allReviews,
        message: 'All Reviews were deleted!',
      });
  }).catch(error => {
    console.log({msg: 'err', error});
    return res.status(400).json({
            success: false,
            error,
            message: 'Error occured!'
          });
  });
}


module.exports = {
    getReviewsByIsbn,
    getRatingByIsbn,
    createReview,
    deleteReviewById,
    deleteAllReviews
};
