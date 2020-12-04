/**
 * Container for the layout of multiple BookCards
 * Use in the landing page.
 */

import React from 'react'
import { connect } from 'react-redux';
import { BookCard } from '.'
import '../static/styles/BookCard.css'

/**
 * 
 * @param {books, isLoading} props
 */
const CardContainer = (props) => {
  const content = (books) => {
    if (props.isLoading) {
      return (
        <div className='loading'>
          <div className='spinner-border text-light' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      );
    }
    if (!books.length) {
      return (
        <div className='no-result'>
          Sorry... no result could be found
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

const mapStateToProps = (state) => {
    return { isLoading : state.books.isLoading }
}

export default connect(mapStateToProps, null)(CardContainer)
