import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { submitSearchForm } from 'modules/search'
import styles from './index.scss'
import CSSModules from 'react-css-modules'

let NoteForm = CSSModules(({ handleSubmit }) => {
  return (
    <form styleName='note-form' onSubmit={ handleSubmit }>
      <div>
        <Field name='searchText'
          component='input'
          type='text'
        />
      </div>
      <div>
        <Field name="newContent" component='textarea' />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}, styles)

const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (values) => {
    dispatch(submitSearchForm(values.searchText, values.newContent))
  },
})

NoteForm = reduxForm({
  form: 'searchForm'
})(NoteForm)

NoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteForm)


export default NoteForm
