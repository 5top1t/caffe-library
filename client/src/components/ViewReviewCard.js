import React from 'react'
import ReactStars from 'react-stars'


/**
 * 
 * @param {date, rating, review} props 
 * 
 * Use to display a single review
 */
const ViewReviewCard = (props) => {
    let date = new Date(props.date).toUTCString().split(' ')
 
    return (
      <div className='review-wrapper'>
        <div className='review-content'>
          <div className='review-header'>
            <p className='review-date'>
              {date[2] + " " + date[1] + ", " + date[3]}
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
