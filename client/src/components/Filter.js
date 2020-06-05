import React from 'react'
import { connect } from 'react-redux'
import '../styles/Category.css'

/**
 * 
 * @param {onClose} props 
 * 
 * onClose is passed on props by list.js and expects the updated authors and years filter
 */
const Filter = (props) => {
    var userAuthors = []
    var userYears = []
    var unavailable = props.unavailable;

    const onHandleChange = (e) => {
        e.persist()
        var checked = []
        for (let i = 0; i < e.target.form.elements.length; i++) {
            if (e.target.form.elements[i].checked) {
                checked.push(e.target.form.elements[i].id )
            }
        }
        if (e.target.form.id === 'author') {
            userAuthors = checked
            return
        }
        if (e.target.form.id === 'years') {
            userYears = checked
            return;
        }

        unavailable = checked.length ? true : false;
    }

    if (!props.show) return (
        <div className='filter-wrapper-off'>
            {props.children}
        </div>
    )

    return (
        <div className='filter-wrapper-on'>
            <div className='filter-wrapper-content'>
                <div className='filter-wrapper-filters'>
                    <div className='filter-heading'>
                        <i className="fa fa-filter" aria-hidden="true"></i>
                        <h4>Filter</h4>
                    </div>
                    <div className="filter-content-form">
                        <form id="unavailable" onChange={onHandleChange}>
                            {unavailableFilter(unavailable)}
                        </form>
                        <form id="author" onChange={onHandleChange}>
                            {authorsFilter(props.authors)}
                        </form> 
                        <form id="year" onChange={onHandleChange}>
                            {yearsFilter(props.years)}
                        </form>
                    </div>
                </div>
                <div className='filter-wrapper-opaque'>
                    <div>
                        <button className='cat-close-btn btn btn-danger' type='button' onClick={() => props.onClose(unavailable, userAuthors, userYears) }>X</button>
                    </div>
                </div>
            </div>   
            { props.children }
        </div>
    )    
}

const unavailableFilter = (unavailable) => {
    return (
        <div className="filter-section">
            <div className="filter-section-title">
                <p>Out of Stock</p>
            </div>
            <div className="filter-section-wrapper">
                <div className="author-filter-wrapper">
                    <div className="form-check">
                        <input className="form-check-input" id={'unavailable'} type="checkbox" defaultChecked={unavailable}/>
                        <label className="form-check-label" htmlFor="gridCheck">
                            unavailable
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )

}

const authorsFilter = (authors) => {
    if (!authors.length) {
        return (
            <div className="filter-section">
                <div className="filter-section-title">
                    <p>Author</p>
                </div>
                <div className="filter-section-wrapper">
                    <p>No result.</p>
                </div>
            </div>
        )  
    }
    return (
        <div className="filter-section">
            <div className="filter-section-title">
                <p>Author</p>
            </div>
            <div className="filter-section-wrapper">
                <div className="author-filter-wrapper">
                    {authors.map(author => (
                        <div className="author-filter-content form-group" key={author._id}>
                            <div className="form-check">
                                <input className="form-check-input" id={author._id} type="checkbox" />
                                <label className="form-check-label" htmlFor="gridCheck">
                                    {author._id}
                                    <p className="label-count">{author.count}</p>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const yearsFilter = (years) => {
    if (!years.length) {
        return (
            <div className="filter-section">
                <div className="filter-section-title">
                    <p>Author</p>
                </div>
                <div className="filter-section-wrapper">
                    <p>No result.</p>
                </div>
            </div>
        )
    }
    return (
        <div className="filter-section">
            <div className="filter-section-title">
                <p>Publication Year</p>
            </div>
            <div className="filter-section-wrapper">
                <div className="year-filter-wrapper">
                    {years.map(year => (
                        <div className="author-filter-content form-group" key={year._id}>
                            <div className="form-check">
                                <input className="form-check-input" id={year._id} type="checkbox" />
                                <label className="form-check-label" htmlFor="gridCheck">
                                    {year._id}
                                    <p className="label-count">{year.count}</p>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


const  mapStateToProps = (state) => {
  return { 
    authors: state.books.authors,
    years: state.books.years,
    queryAuthors: state.books.filters.authors,
    queryYears: state.books.filters.years,
    unavailable: state.books.filters.unavailable
   }
}

export default connect(mapStateToProps)(Filter)