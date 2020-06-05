/**
 * Component used to represent any list of books
 * 
 */
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
    setOnFilter,
    setUnavailable,
    setUserAuthorsFilters,
    setUserPublicationYearsFilter
  } from '../actions'

import {
  BookCard, 
  BookCardContainer, 
  Filter, 
  Pagination  } from '.'

import api from '../api'



const List = (props) => {
  const history = useHistory()
  
  useEffect(() => {
    // Make url query param for the backend
    var a = props.queryAuthors.join('&a=')
    var y = props.queryYears.join('&y=')
    api.books.queryBooks(props.query, props.page, props.unavailable, a, y).then(res => {
      if (res.data.success) {
          props.setBooks(res.data.data)
          props.setCount(res.data.count)
          props.setPublicationYears(res.data.years)
          props.setAuthors(res.data.authors)
        }
        window.scrollTo(0, 0)
      }, (err) => {
      console.log({err})
    })
  }, [props.page, props.query, props.queryAuthors, props.queryYears, props.unavailable])

  const onClose = (unavailable, authors, publication_years) => {
    var unavailableChanged = props.unavailable == !unavailable;
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
    <Filter show={props.onFilter} onClose={onClose} authors={[]}>
      <BookCardContainer>
        {props.books.map(book => (
            <BookCard key={book.isbn} book={book}></BookCard>
        ))}
      </BookCardContainer>
      <Pagination page={props.page} count={props.count}/>
    </Filter>
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
    setOnFilter,
    setUnavailable,
    setUserAuthorsFilters,
    setUserPublicationYearsFilter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(List)