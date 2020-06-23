import React from 'react'
import { NewReviewCard , ViewReviewCard} from '../components'

/**
 * 
 * @param {reviews, visible, onSubmit, onCancel} props 
 * 
 * Used to contain multiple reviews and visible triggers new review input
 */
const ReviewCardContainer = (props) => {
    
    var reviews = null
    if (props.reviews.length) {
        reviews = props.reviews.map(review => (
            <ViewReviewCard key={new Date(review.date).getMilliseconds()} date={review.date} review={review.review} rating={review.rating}/>
        ))
        //console.log(props.reviews)
    } else {
        reviews = (<i>This book has not been reviewed</i>)
    }

    return (
            <div className='review-container-wrapper'>
                <div className='review-container-header'>
                    <p>Reviews</p>
                </div>
                <div className='review-contianer-content'>
                    <NewReviewCard 
                        visible={props.visible} 
                        onSubmit={props.onSubmit} 
                        onCancel={props.onCancel}/>
                    {reviews}
                </div>
            </div>
    )
}


export default ReviewCardContainer
