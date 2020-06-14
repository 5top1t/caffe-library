import React from 'react'

import { connect } from 'react-redux'
import { Footer } from '../components'

import '../static/styles/404.css'

const Lost_404 = (props) => {
  return (
    <div>
      <div className='home-btn-wrapper'>
        <div className='home-btn-content'>
          <a
            href={'/books/search?pg=' + props.page + '&q=' + props.query}
            type='button'
            className='btn btn-light btn-lrg'
          >
            Go Home
          </a>
        </div>
      </div>
      <div className='lost-404-wrapper'>
        <div className='lost-404-content'>
          <div className='lost-404-lead'>
            <p>404</p>
            <p>PAGE NOT FOUND</p>
          </div>
          <div className='lost-404-info'>
            <p>
              Sorry the page you are looking for does not exist, or is
              temporarily unavailable.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    query: state.books.query,
    page: state.books.page
  };
};

export default connect(mapStateToProps)(Lost_404)
