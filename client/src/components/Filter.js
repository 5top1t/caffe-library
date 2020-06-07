import React from 'react'
import { connect } from 'react-redux'
import '../styles/Filter.css'

/**
 * 
 * @param {*ss} props 
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
        if (e.target.form.id === 'year') {
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
                            {unavailableFilter(!props.count, unavailable)}
                        </form>
                        <form id="author" onChange={onHandleChange}>
                            {sectionFilter("Author", props.authors)}
                        </form> 
                        <form id="year" onChange={onHandleChange}>
                            {sectionFilter("Publication Year", props.years)}
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


const unavailableFilter = (empty, unavailable) => {
    return (
        <div className="filter-section">
            {filterSectionTiltle("Out of Stock")}
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


const sectionFilter = (title, fields) => {
    if (!fields.length) {
        return emptyFilterSection(title)
    }

    return (
        <div className="filter-section">
            {filterSectionTiltle(title)}
            <div className="filter-section-wrapper">
                <div>
                    {fields.map(field => { return filterSectionInput(field)})}
                </div>
            </div>
        </div>
    )
}


const emptyFilterSection = (title) => {
    return (
        <div className="filter-section">
            {filterSectionTiltle(title)}
            <div className="filter-section-wrapper">
                <p className="field-no-result">No result.</p>
            </div>
        </div>
    )   
}


const filterSectionTiltle = (title) => {
    return (
        <div className="filter-section-title">
            <p>{title}</p>
        </div>
    )
}

const filterSectionInput = (field) => {
    return (
        <div className="form-group" key={field._id}>
            <div className="form-check">
                <input className="form-check-input" id={field._id} type="checkbox" />
                <label className="form-check-label" htmlFor="gridCheck">
                    {field._id}
                    <p className="label-count">{field.count}</p>
                </label>
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
