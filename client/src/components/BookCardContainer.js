/**
 * Container for the layout of multiple BookCards
 * Use in the landing page.
 */
import React from 'react'
import '../styles/BookCard.css'

const CardContainer = (props) =>
  <div className="card-container-wrapper">
    <div className='card-container-content'>
      <div className='card-container-books'>
        {props.children}
      </div>
    </div>
  </div>

export default CardContainer