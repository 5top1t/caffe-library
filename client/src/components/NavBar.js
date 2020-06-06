import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useHistory } from "react-router-dom"
import queryString from 'query-string'
import { 
  setQuery, 
  setPage,
  setOnFilter,
  setUserPublicationYearsFilter,
  setUserAuthorsFilters
} from '../actions/bookActions'
import '../styles/Nav.css'

/**
 * 
 * @param {*} props 
 */
const NavBar = (props) => {
  const PAGE_1 = 1
  const EMPTY_FILTER = []
  const history = useHistory()
  const [searchField, setSearchField] = useState(props.query)

  /**
   * This component capture changes in the url using history
   * and updates the bookReducer query and page values
   */

  if ((new RegExp('/books*')).test(history.location.pathname)) {
    var queryDict = queryString.parse(history.location.search)
    if ('q' in queryDict && queryDict.q !== props.query) {   
      props.setQuery(queryDict.q)
    }
    if ('pg' in queryDict && queryDict.pg !== props.page) { 
      props.setPage(queryDict.pg)
    }
  }


  useEffect(() => { 
    setSearchField(props.query)
  }, [props.query, props.setPage, props.onFilter
  ])


  // Capture user input in serch box
  const onTextChange = (e) => {
    setSearchField(e.target.value)
  }


  // Submit query
  const onSearch = (e) => {
    e.preventDefault()
    props.setQuery(searchField)
    props.setUserAuthorsFilters(EMPTY_FILTER)
    props.setUserPublicationYearsFilter(EMPTY_FILTER)
    props.setPage(PAGE_1)
    history.push('/books/search?pg='+ 1 + '&q=' + searchField )
  }


  // Trigger action when user pressess home button
  const resetFilter = () => {
    history.push('/books/search?pg='+ 1 + '&q=' )
    setSearchField('')
    props.setQuery('')
    props.setUserAuthorsFilters([])
    props.setUserPublicationYearsFilter([])
    props.setPage(PAGE_1)
  }


  return (
    <div>
      <div className='nav-wrapper'>
        <div className='search-wrapper input-group mb-3'>
          <div className='nav-lead-wrapper'>
            <div className='nav-lead-content'>
              <i onClick={() => props.setOnFilter(true) } className="fas fa-bars"></i>
              <button className='home-button' onClick={resetFilter}>
                <h2>
                  Boston Caffe Library
                </h2>
              </button>
            </div>
          </div>
          <div className='nav-wrapper-content'>
            <div className='nav-wrapper-options'>
              <form className='search-form' onSubmit={onSearch}>
                <input type='text' className='form-control' value={searchField} placeholder='Search by title isbn or author...' aria-label='Username' aria-describedby='basic-addon1' onChange={onTextChange}/>
                <div className='input-group-prepend'>
                    <button className='btn btn-outline-light' type='button' onClick={onSearch} disabled={props.onFilter}>
                        <svg className='bi bi-search' width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                            <path fillRule='evenodd' d='M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z' clipRule='evenodd'/>
                            <path fillRule='evenodd' d='M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z' clipRule='evenodd'/>
                        </svg>
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}


const  mapStateToProps = state => {
  return { 
    query: state.books.query,
    page: state.books.page,
    onFilter: state.books.onFilter
   }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators({ 
    setQuery, 
    setPage, 
    setOnFilter, 
    setUserAuthorsFilters, 
    setUserPublicationYearsFilter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
