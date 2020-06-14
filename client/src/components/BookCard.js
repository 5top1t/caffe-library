/**
 * Card representation of a book in the landing page.
 */

import React from 'react'

/**
 * 
 * @param {book} props 
 */
const BookCard = (props) => {
  const url = '/book/view/' + props.book.isbn

  return (
    <div className='book-card-wrapper'>
      <div className='book-card-content'>
          <a className='book-card-image-button' href={url} ><img className='book-card-image' alt={props.book.title} src={props.book.image_url_l}/></a>
          <div className='book-card-info'>
            <p className='book-card-title'>{props.book.title}</p>
            <p className='book-card-author'>by. <i>{props.book.author}</i></p>
            <p className='book-card-year'>published. <i>{props.book.publication_year}</i></p>
            <p className='book-card-availability'>copies. <i>{props.book.available}</i></p>
          </div>
      </div>
    </div>
  )
}


export default BookCard
