import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'

import 'materialize-css'
import { Footer, ReviewCardContainer } from '../components'

import ReactStars from 'react-stars'
import api from '../api'
import '../styles/View.css'


const View = (props) => {
    const history = useHistory()
    const [bookInfo, setBookInfo] = useState({})
    const [reviews, setReviews] = useState([])
    const [isReviewVisible, setIsReviewVisible] = useState(false)
    const [rating, setRating] = useState(0)
    const [ratingCount, setRatingCount] = useState(0)

    useEffect(() => {
        api.books.getBookByIsbn(props.match.params.isbn).then(res => {
            if (res.data.success) {
                setBookInfo(res.data.data)
                api.reviews.getReviewsByIsbn(props.match.params.isbn).then(res => {
                    if (res.data.success) {
                        setReviews(res.data.data)
                    }
                })
                api.reviews.getRatingByIsbn(props.match.params.isbn).then(res => {
                    if (res.data.success) {
                        setRating(res.data.rating)
                        setRatingCount(res.data.count)
                    }
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }, [props.match.params.isbn, bookInfo.copies, bookInfo.available])

    const goHome = () => {
        history.push('/books/search?pg='+ props.page + '&q=' + props.query)
    }

    const onRentBook = () => {
        api.books.rentBookByIsbn(bookInfo.isbn).then(result => {
            if (result.data.success) {
                //console.log({ rentResult: result})
                setBookInfo({...bookInfo, available: result.data.available})
            }
        })
    }

    const onReturnBook = (newRating, newReview) => {
        setIsReviewVisible(false)
        api.books.returnBookByIsbn(bookInfo.isbn).then(returnResult => {
            if (returnResult.data.success) {
                setBookInfo({...bookInfo, available: returnResult.data.available})
                if (newReview) {
                    api.reviews.insertReview({isbn: bookInfo.isbn, rating: newRating, review: newReview}).then(reviewResult => {
                        // update component
                        if (reviewResult.data.success) {
                           setBookInfo({...bookInfo, isbn: reviewResult.data.isbn})
                           onCancelReturn()
                        }
                    })
                }
            }
        }).catch(err => console.log({err}))
    }

    const onCancelReturn = () => {
        setIsReviewVisible(false)
    }

    const onShowReview = () => {
        setIsReviewVisible(true)
    }

    return (
        <div>
            <div className='home-btn-wrapper'>
                <div className="home-btn-content">
                     <button onClick={() => goHome()} type="button" className="btn btn-light btn-lrg">Go Home</button>
                </div>
            </div>
            <div className='view-book-wrapper'>
                <div className='view-book-content'>
                    <div className='view-image-column'>
                        <img alt={bookInfo.title} src={bookInfo.image_url_l}/>
                    </div>    
                    
                    <div className='view-book-info'>
                        <div className='view-book-legend'>
                            <p className='book-card-title'>{bookInfo.title}</p>
                            <p className='book-card-author'>by. <i>{bookInfo.author}</i></p>
                            <p className='book-card-year'>published. <i>{bookInfo.publication_year}</i></p>
                            <p className='book-card-availability'>copies. <i>{bookInfo.available}</i></p>
                            <div className='book-rating'>
                                <ReactStars count={5} value={rating} size={20} color2={'#ffd700'} edit={false}/>
                                <p className='book-rating-count'>{ratingCount} ratings</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='view-book-buttons'>
                            <button type="button" className="btn btn-warning" disabled={bookInfo.available <= 0} onClick={onRentBook}>Rent</button>
                            <button type="button" className="btn btn-warning" disabled={bookInfo.copies <= bookInfo.available && !isReviewVisible} onClick={onShowReview}>Return</button>
                        </div>
                        <hr></hr>
                        <ReviewCardContainer reviews={reviews} visible={isReviewVisible} onCancel={onCancelReturn} onSubmit={onReturnBook}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        query: state.books.query,
        page: state.books.page
   }
}


export default connect(mapStateToProps)(View)
