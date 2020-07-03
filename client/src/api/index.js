/**
 * API to the node backend
 */

import axios from 'axios'

const url = process.env.NODE_ENV === 'development' 
    ? 'localhost:3000'
    : 'beantowncaffe.io:3000'

const api = axios.create({
  baseURL: `http://${url}/api`
})

// Books API
const bookRoute = '/book'
export const queryBooks = (text, page, unavailable, authors, publication_years) => {
  // Conditions are used to capture user filters
  var url = bookRoute+`/query/?q=${text}&pg=${page}&unav=${unavailable}`
  if (authors) url += `&a=${authors}`
  if (publication_years) url += `&y=${publication_years}`
  return api.get(url)
}
export const getBookByIsbn = isbn => api.get(bookRoute+`/${isbn}`)
export const insertBook = payload => api.post(bookRoute+`/`, payload)
export const rentBookByIsbn = isbn => api.put(bookRoute+`/rent/${isbn}`)
export const returnBookByIsbn = isbn => api.put(bookRoute+`/return/${isbn}`)
/* export const deleteBookByIsbn = isbn => api.delete(bookRoute+`/${isbn}`) */

// Reviews API
const reviewRoute = '/review'
export const getReviewsByIsbn = isbn => api.get(reviewRoute+`/${isbn}`)
export const getRatingByIsbn = isbn => api.get(reviewRoute+`/rating/${isbn}`)
export const insertReview = payload => api.post(reviewRoute+`/`, payload)
export const deleteReviewById = id => api.delete(reviewRoute+`/${id}`)

const books = {
  queryBooks,
  getBookByIsbn,
  insertBook,
  rentBookByIsbn,
  returnBookByIsbn
}

const reviews = {
  getReviewsByIsbn,
  getRatingByIsbn,
  insertReview,
  deleteReviewById
}

export default { books, reviews }