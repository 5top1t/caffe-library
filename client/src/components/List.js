import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useHistory } from "react-router-dom"
import queryString from 'query-string'
import { 
    setBooks, 
    setPublicationYears,
    setAuthors,
    setPage, 
    setCount,
    setQuery,
    setIsLoading,
    setOnFilter,
    setUnavailable,
    setUserAuthorsFilters,
    setUserPublicationYearsFilter
  } from '../actions'

import { 
  BookCardContainer, 
  Filter, 
  Pagination  } from '.'

import api from '../api'

/**
 * 
 * @param {*} props 
 */
const List = (props) => {
  const history = useHistory()
  const {
    page,
    query,
    unavailable,
    queryAuthors,
    queryYears,
    setPublicationYears,
    setIsLoading,
    setAuthors,
    setCount,
    setBooks
  } = props;

  useEffect(() => {
    // Build url query param for the backend
    var a = queryAuthors.join('&a=')
    var y = queryYears.join('&y=')
    setIsLoading(true)
    api.books.queryBooks(query, page, unavailable, a, y).then(res => {
      if (res.data.success) {
          setBooks(res.data.data)
          setCount(res.data.count)
          setPublicationYears(res.data.years)
          setAuthors(res.data.authors)
        }
        window.scrollTo(0, 0)
        setIsLoading(false);
      }, (err) => {
      setIsLoading(false);
      console.log({err})
    })
  }, [
    page, 
    query, 
    queryAuthors, 
    queryYears, 
    unavailable, 
    setAuthors, 
    setPublicationYears, 
    setIsLoading,
    setCount,
    setBooks])

  const onCloseSideBar = (unavailable, authors, publication_years) => {
    var unavailableChanged = props.unavailable === !unavailable;
    props.setOnFilter(false)
    if (!authors.length && !publication_years.length && !unavailableChanged) return
    if (unavailableChanged) props.setUnavailable(unavailable)
    if (authors.length) props.setUserAuthorsFilters(authors)
    if (publication_years.length) props.setUserPublicationYearsFilter(publication_years)
    
    var PAGE_1 = 1
    var queryDict = queryString.parse(history.location.search)
    queryDict.pg = PAGE_1
    history.push(history.location.pathname + '?'+ queryString.stringify(queryDict))
  }

  return (
    <div>
        <Filter show={props.onFilter} onClose={onCloseSideBar} authors={[]}/>
        <BookCardContainer books={props.books}/>
        <Pagination page={props.page} count={props.count}/>
    </div>
  )
}


const  mapStateToProps = (state) => {
  return { 
    query: state.books.query,
    books: state.books.books, 
    page: state.books.page,
    onFilter: state.books.onFilter,
    queryAuthors: state.books.filters.authors,
    queryYears: state.books.filters.years,
    unavailable: state.books.filters.unavailable
   }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators({ 
    setBooks, 
    setPublicationYears, 
    setAuthors, 
    setPage, 
    setCount, 
    setQuery, 
    setIsLoading,
    setOnFilter,
    setUnavailable,
    setUserAuthorsFilters,
    setUserPublicationYearsFilter }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(List)
