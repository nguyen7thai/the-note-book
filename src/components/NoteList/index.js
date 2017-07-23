import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { setAndHandleNotesListener } from 'modules/listeners'
import { selectNote } from 'modules/notes'
import { getHitNotes, getNotesSortedIds } from 'selectors'
import styles from './index.scss'
import CSSModules from 'react-css-modules'
import classnames from 'classnames'

const NoteList = CSSModules(({ notes, sortedIds, current, selectNote }) => {
  return <div styleName='note-list'>
    <ul>
      {
        sortedIds.map((id => (
          <li key={id} onClick={() => selectNote(id)} styleName={classnames({current: id === current})}>
            {notes[id].title}
          </li>
        )))
      }
    </ul>
  </div>
}, styles)

const mapStateToProps = (state) => ({
  notes: getHitNotes(state),
  sortedIds: getNotesSortedIds(state),
  current: state.notes.current
})

const mapDispatchToProps = (dispatch) => ({
  setAndHandleNotesListener: () => dispatch(setAndHandleNotesListener()),
  selectNote: (id) => dispatch((selectNote(id)))
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.setAndHandleNotesListener()
    }
  })
)(NoteList)

