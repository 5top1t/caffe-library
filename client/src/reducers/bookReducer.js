
/**
 * Reducer to display a list of books and manage pagination
 */

import * as types from '../actions/actionTypes';

const initialState = {
  page: 1,
  count: 0,
  query: "",
  books: [],
  authors: [],
  years: [],
  onFilter: false,
  filters: {
    unavailable: false,
    authors: [],
    years: []
  },




}

const bookReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.SET_BOOKS:
      return {
        ...state,
        books: action.books
      }

    case types.SET_AUTHORS:
      return {
        ...state,
        authors: action.authors
      }

    case types.SET_PUBLICATION_YEARS:
      return {
        ...state,
        years: action.years
      }

    case types.SET_COUNT:
      return {
        ...state,
        count: action.count
      }

    case types.SET_PAGE:
      return {
        ...state,
        page: action.page
      }

    case types.SET_QUERY:
      return {
        ...state,
        query: action.query
      }

    case types.SET_ON_FILTER:
      return {
        ...state,
        onFilter: action.show
      }

    case types.SET_UNAVAILABLE:
      return {
        ...state,
        filters: {
          ...state.filters,
          unavailable: action.unavailable
        }
      }

    case types.SET_USER_AUTHORS_FILTER:
      return  {
        ...state,
        filters: {
          ...state.filters,
          authors: action.authors
        }
      }

    case types.SET_USER_PUBLICATION_YEARS_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          years: action.publication_years
        }
      }
      
    default:
      return state;
  }
}

export default bookReducer;