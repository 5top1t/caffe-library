/**
 * API to the node backend
 */

import axios from 'axios'

const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://bostoncaffelibrary.com';

const api = axios.create({
  baseURL: `${url}/api`
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
export const getImage = (isbn, url) => {
        var domain = 'http://images.amazon.com/images/P/';
        var bucket_name = 'caffe-library-prod';
        var object_name = url.replace(domain, '');
        var s3_url = `https://${bucket_name}.s3.amazonaws.com/${isbn}/${object_name}`;
        return s3_url;
      };
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
  returnBookByIsbn,
  getImage
}

const reviews = {
  getReviewsByIsbn,
  getRatingByIsbn,
  insertReview,
  deleteReviewById
}

export default { books, reviews }