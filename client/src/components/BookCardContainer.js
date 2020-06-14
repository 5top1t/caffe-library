/**
 * Container for the layout of multiple BookCards
 * Use in the landing page.
 */

import React from 'react'
import { BookCard } from '.';
import '../static/styles/BookCard.css'

/**
 * 
 * @param {books} props 
 */
const CardContainer = (props) => {
  const content = (books) => {
    if (!books.length) {
      return (
        <div className='no-result'>
          Sorry... the query could not be found.
        </div>
      )
    }
    return (
        books.map(book => (
          <BookCard key={book.isbn} book={book}></BookCard>
        )
      )
    )
  }

  return (
    <div className='card-container-wrapper'>
      <div className='card-container-content'>
        <div className='card-container-books'>
          {content(props.books)}
        </div>

      </div>
    </div>
  );
}


export default CardContainer
