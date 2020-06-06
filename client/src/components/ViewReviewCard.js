import React from 'react'
import ReactStars from 'react-stars'


/**
 * 
 * @param {date, rating, review} props 
 * 
 * Use to display a single review
 */
const ViewReviewCard = (props) => {
    // let date = props.date.split('T')[0].split('-')
    let date = new Date(props.date)
    return (
      <div className='review-wrapper'>
        <div className='review-content'>
          <div className='review-header'>
            <p className='review-date'>
              {date.getMonth()}-{date.getDate()}-{date.getFullYear()}
            </p>
            <ReactStars
              count={5}
              value={props.rating}
              size={16}
              color2={'#ffd700'}
              edit={false}
            />
          </div>
          <div className='review-text'>
            <p>{props.review}</p>
          </div>
        </div>
      </div>
    );
}


export default ViewReviewCard
