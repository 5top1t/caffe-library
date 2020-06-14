const Book = require('../models/book')


getBooks = async (req, res) => {
  return queryBooks(req, res)
}


queryBooks = async (req, res) => {
  /**
   * Query options:
   * q: searched string
   * a: authors names array
   * p: publication years array
   * unav: copies == 0 a.k.a unavailable
   * pg: page number int
   */
  // Default values
  var text = req.query.q || ''
  var authors = req.query.a ||  [/.*/] // regex to match all authors
  var publication_years = req.query.y || [] 
  var unavailable = req.query.unav === 'true' || false
  var page = req.query.pg || "1"

  if (!page || page < 1) {
    page = 1
  }
  if (typeof authors === 'string' || authors instanceof String) {
    authors = [authors]
  }
  if (typeof publication_years === 'string' || publication_years instanceof String) {
    publication_years = [publication_years]
  }
  for (let i = 0; i < publication_years.length; i++) {
    publication_years[i] = Number(publication_years[i])
  }

  var size = 18
  var skip = size * (page - 1)
  text = text.trim()

  await Book.aggregate(
    [
      {
        $facet: {
          "unavailable": [
            buildQuery(text, authors, publication_years, unavailable),
            {$group: { _id: null, count: { $sum: 1}}}
          ],
          "count": [
            buildQuery(text, authors, publication_years, unavailable),
            {$group: { _id: null, count: { $sum: 1}}}
          ],
          "authors": [
            buildQuery(text, authors, publication_years, unavailable),
            {$group: { _id: "$author", count: { $sum: 1}}},
            { $sort : { _id: 1, count: 1 } }
          ],
          "years": [
            buildQuery(text, authors, publication_years, unavailable),
            {$group: { _id: "$publication_year", count: { $sum: 1}}},
            { $sort : { _id: 1, count: 1 } }
          ],
          "books": [
            buildQuery(text, authors, publication_years, unavailable),
            { $sort : { _id: 1, count: 1 }},
            { $skip : skip },
            { $limit: size }
            
          ]
        }
      }
  ]).then(queryResult => {
    let result = {
      books: queryResult[0].books,
    }
    result.count = result.books.length
    result.count = result.books.length? queryResult[0].count[0].count : 0
    result.authors = result.books.length? queryResult[0].authors : []
    result.years = result.books.length? queryResult[0].years : []
    return res
      .status(200)
      .json({
        success: true,
        count: result.count,
        data: result.books,
        years: result.years,
        authors: result.authors
      })
  }).catch(error => {      
      console.log({error})
      return res.status(400).json({
          success: false,
          error,
          message: 'Error occured!'
        })
    }
  )
}

getBookByIsbn = async (req, res) => {
  checkIsbn(req, res)
  await Book.findOne({isbn: req.params.isbn}).then(function(book) {
      return res
        .status(200)
        .json({
          success: true,
          data: book,
        })
    }).catch(error => {      
      return res.status(404).json({
          success: false,
          error,
          message: 'Error occured!'
        })
      }
    )
}


createBook = (req, res) => {
  checkBody(req, res)
  const book = new Book(req.body)
  book
    .save()
    .then(function() {
      return res.status(201).json({
        success: true,
        isbn: book.isbn,
        message: 'Book created!',
      })
    })
    .catch(error => {
      return res.status(400).json({
        success: false,
        error,
        message: 'Error occured!'
      })
    })
}


rentBook = async (req, res) => {
  checkIsbn(req, res)
  await Book.findOne({ isbn: req.params.isbn }).then(function(book) {
    book.available -= 1
    book
      .save()
      .then(() => {
        return res.status(200)
          .json({
            success: true,
            isbn: book.isbn,
            available: book.available,
            message: 'Enjoy your read!',
          })
      })
  }).catch(error => {     
        return res.status(400).json({
            success: false,
            error,
            message: 'Error occured!'
          })
        }
      )
}


returnBook = async (req, res) => {
  checkIsbn(req, res)
  await Book.findOne({ isbn: req.params.isbn }).then(function(book) {
    book.available += 1
    book
      .save()
      .then(() => {
        return res.status(200)
          .json({
            success: true,
            isbn: book.isbn,
            available: book.available,
            message: 'Thank you. Check out our other selections.',
          })
      })
  }).catch(error => {
      console.log(error)
      return res.status(400).json({
          success: false,
          error,
          message: 'Error occured!'
        })
      }
    )
}


deleteBook = async (req, res) => {
  checkIsbn(req, res)
  await Book.findOneAndDelete({ isbn: req.params.isbn }).then(function(book) {
    return res.status(200)
      .json({
        success: true,
        book,
        message: 'Book Deleted!',
      })
    }).catch(error => {     
        return res.status(400).json({
            success: false,
            error,
            message: 'Error occured!'
          })
        }
      )
}


/**
 * 
 * @param {string} text 
 * @param {array} authors 
 * @param {arrya} publication_years 
 * @param {boolean} unavailable 
 * 
 * builds a mongo db query given the filter paramns
 */
const buildQuery = (text, authors, publication_years, unavailable) => {
  var query = 
    { 
      $match: { 
        $or: [
          { isbn: { 
            "$regex": text, "$options": "i" 
          }},
          { title: { 
            "$regex": text, "$options": "i" 
          }},
          { author: { 
            "$regex": text, "$options": "i" 
          }}
        ],
        author: { $in: authors },
        publication_year: {
          [publication_years.length ? "$in" : "$nin"] : publication_years 
        },
        available: {
          [unavailable ? "$gte" : "$gt"] : 0 
        }
      } 
    }
  return query
}



/*
  check if request has isbn
*/
checkIsbn = function(req, res) {
  if (!req.params.isbn) {
    return res.status(400).json({
      success: false,
      message: 'You must provide an isbn',
    })
  }
}

/*
  Check if request has a body
*/
checkBody = function(req, res) {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: 'You must provide an book.',
    })
  }
}

module.exports = {
  getBooks,
  queryBooks,
  getBookByIsbn,
  createBook,
  rentBook,
  returnBook,
  deleteBook
}
