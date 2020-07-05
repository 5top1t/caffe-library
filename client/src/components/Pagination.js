import React, { useCallback} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useHistory } from "react-router-dom"
import queryString from 'query-string'
import { setPage } from '../actions/bookActions'

import '../static/styles/Pagination.css'

/**
 * 
 * @param {*} props 
 */
const Pagination = (props) => {
    const BOOKS_PER_PAGE = 18
    const history = useHistory()
    // const [pages, setPages] = useState([])

    /**
     * returns an array of text for pagination buttons
     */
    const generatePages = (pg, totalPages, setPage) => {
        const PREVIOUS = 'Previous'
        const NEXT = 'Next'
        
        var pagination = []
        var page = Number(pg)
        let startPage = Math.max(1, page-2)
        let endPage = Math.min(startPage+4, totalPages)
        let i = startPage

        // create previous link
        if (page === 1) {
            pagination.push(disabledPage(PREVIOUS, PREVIOUS))
        } else {
            pagination.push(abledPage(PREVIOUS, (page - 1), setPage))
        }

        // create number pages
        while (i <= endPage) {
            if (i === page) {
                pagination.push(activePage(i))
            } else if (i <= totalPages) {
                pagination.push(abledPage(i, i, setPage))
            }
            i += 1
        }
        
        // create next link
        if (page >= totalPages) {
            pagination.push(disabledPage(NEXT, NEXT));       
        } else {
            pagination.push(abledPage(NEXT, page + 1, setPage))  
        }
        return pagination
    }

    /**
     * Current page
     */
    const activePage = (page) => {
        return (
          <div key={page} className='page-btn'>
            <span type='button' className='btn btn-dark'>
              {page.toString()}
            </span>
          </div>
        );
    }

    /**
     * render disabled page number
     */
    const disabledPage = (page, label) => {
        return (
          <div key={label} className='page-btn'>
            <span type='button' className='btn btn-light'>
              {page}
            </span>
          </div>
        );
    }

    /**
     * render clickable page number
     */
    const abledPage = (label, page) => {
        return (
          <div key={label} className='page-btn'>
            <a
              className='btn btn-link'
              href={navigateToPage(page)}
            >
              {label}
            </a>
          </div>
        );
    }

    const navigateToPage = (page) => {
        var queryDict = queryString.parse(history.location.search)
        queryDict.pg = page
        return history.location.pathname + '?'+ queryString.stringify(queryDict)
    }

    const pages = useCallback(
        generatePages(
        props.page,
        Math.ceil(props.count / BOOKS_PER_PAGE),
        props.setPage
        ),
        [props.count, props.page]
    );

    return (
        <nav className='paginationWrapper'>
            <div className="paginationContent justify-content-center">
                {pages.map(p => p)}
            </div>
        </nav>
    )
}


const  mapStateToProps = (state) => {
  return { page: state.books.page, count: state.books.count }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({setPage}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
