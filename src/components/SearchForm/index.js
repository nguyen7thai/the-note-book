import React from 'react'
import { connect } from 'react-redux'
import { changeSearchKeyword, sendSearchRequest, toggleSearchMode } from 'modules/search'
import styles from './index.scss'
import CSSModules from 'react-css-modules'
import { createNewNote } from 'modules/notes'

let SearchForm = CSSModules(({ keyword, changeSearchKeyword, sendSearchRequest, toggleSearchMode, createNewNote }) => {
  return (
    <div styleName='search-form'>
      <div styleName='control-group'>
        <input type='text' autoComplete='off'
          value={keyword}
          placeholder='// Type here to search or create note'
          onChange={e => {
            const value = e.target.value
            changeSearchKeyword(value)
            sendSearchRequest(value)
            toggleSearchMode(value.length > 0)
          }}
        />
        {
          keyword.length > 0 &&
          <span styleName='btn-new-note' onClick={() => createNewNote(keyword)}>
            New Note
          </span>
        }
      </div>
    </div>
  )
}, styles)

const mapStateToProps = (state, props) => ({
  keyword: state.search.keyword,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeSearchKeyword: (keyword) => {
    dispatch(changeSearchKeyword(keyword))
  },
  sendSearchRequest: (keyword) => {
    dispatch(sendSearchRequest(keyword))
  },
  toggleSearchMode: (isOn) => {
    dispatch(toggleSearchMode(isOn))
  },
  createNewNote: (keyword) => dispatch(createNewNote(keyword, ''))
})

SearchForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)


export default SearchForm
