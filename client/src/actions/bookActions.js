import * as types from './actionTypes'


/**
 * 
 * @param {int} page 
 * 
 * User trigger to navigate pages.
 * Trigger to return to first page for new queries
 * 
 */
export const setPage = (page) => {
  return (dispatch) => {
    dispatch({ type: types.SET_PAGE, page })
  }
}

/**
 * 
 * @param {int} count 
 * 
 * Total number of books return by a query.
 * Used to create pagination.
 * 
 */
export const setCount = (count) => {
  return (dispatch) => {
    dispatch({ type: types.SET_COUNT, count })
  }
}

/**
 * 
 * @param {array} books 
 * 
 * Array of books for a single page return by the query
 * Currently rendering 18 Books per page. Max array length is 18.
 */
export const setBooks = (books) => {
  return (dispatch) => {
    dispatch({ type: types.SET_BOOKS, books })
  }
}


/**
 * 
 * @param {array} authors 
 * 
 * Array of authors for the books in the total query not just current page.
 */
export const setAuthors = (authors) => {
  return (dispatch) => {
    dispatch({ type: types.SET_AUTHORS, authors })
  }
}

/**
 * 
 * @param {array} years 
 * 
 * Array of publication years for the books in the total query not just current page.
 */

export const setPublicationYears = (years) => {
  return (dispatch) => {
    dispatch({ type: types.SET_PUBLICATION_YEARS, years })
  }
}

/**
 * 
 * @param {string} query
 * 
 * String typed in the user search bar
 */
export const setQuery = (query) => {
  return (dispatch) => {
    dispatch({ type: types.SET_QUERY, query })
  }
}

/**
 * 
 * @param {boolean} unavailable
 * 
 * String typed in the user search bar
 */
export const setUnavailable = (unavailable) => {
  return (dispatch) => {
    dispatch({ type: types.SET_UNAVAILABLE, unavailable })
  }
}

/**
 * 
 * @param {boolean} isLoading 
 * 
 * Trigger showing/hiding the side bar
 */
export const setIsLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: types.SET_IS_LOADING, isLoading })
  }
}

/**
 * 
 * @param {boolean} show 
 * 
 * Trigger showing/hiding the side bar
 */
export const setOnFilter = (show) => {
  return (dispatch) => {
    dispatch({ type: types.SET_ON_FILTER, show })
  }
}


/**
 * 
 * @param {array} authors 
 * 
 * Array of authors filtered by the user
 */
export const setUserAuthorsFilters = (authors) => {
  return (dispatch) => {
    dispatch({ type: types.SET_USER_AUTHORS_FILTER, authors })
  }
}

/**
 * 
 * @param {array} publication_years 
 * 
 * Array of publication years filtered by the user.
 */
export const setUserPublicationYearsFilter = (publication_years) => {
  return (dispatch) => {
    dispatch({ type: types.SET_USER_PUBLICATION_YEARS_FILTER, publication_years })
  }
}
