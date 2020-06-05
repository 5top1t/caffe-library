/**
 * Card representation of a book in the landing page.
 */

import React from 'react'
import { useHistory } from 'react-router-dom'

const BookCard = (props) => {
  const history = useHistory()
  const url = '/book/view/' + props.book.isbn

  const viewBook = () => {
    history.push(url)
  }

  return (
    <div className='book-card-wrapper'>
      <div className='book-card-content'>
          <button className='book-card-image-button' onClick={viewBook} ><img className='book-card-image' alt={props.book.title} src={props.book.image_url_l}/></button>
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

