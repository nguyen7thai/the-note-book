import React from 'react'
import { connect } from 'react-redux'
import styles from './index.scss'
import CSSModules from 'react-css-modules'
import { handleNoteContentChange, handleNoteTitleChange, toggleEditTitleMode, sendDeleteNoteRequest } from 'modules/notes'

const CurrentNote = CSSModules(({ note, editingNote, editingTitle, handleNoteContentChange, handleNoteTitleChange, toggleEditTitleMode, deleteNote }) => {
  return note && <div styleName='current-note'>
      <div styleName='title-wrapper'>
        {
          editingTitle
          ? <input
              styleName='title-input'
              type='text' value={note.title}
              onChange={(e) => handleNoteTitleChange(e.target.value)}
            />
          : <span styleName='title-text'>{note.title}</span>
        }
        {
          editingTitle
          ? <span styleName='title-action' onClick={() => toggleEditTitleMode(false)}>Save</span>
          : <span styleName='title-action' onClick={() => toggleEditTitleMode(true)}>Edit title</span>
        }
      </div>
      <textarea
        value={note.content}
        onChange={e => handleNoteContentChange(e.target.value)}
        placeholder='// Enter content here ...'
      />
      <div styleName='bottom-actions'>
        <div styleName='btn-delete-note' onClick={() => deleteNote()}>Delete Note</div>
        <div styleName='save-status'>
          {
            editingNote
            ? <span styleName='saving'>Saving ...</span>
            : <span styleName='saved'>Saved</span>
          }
        </div>
      </div>
    </div>
}, styles)

const mapStateToProps = (state) => ({
  note: state.notes.all[state.notes.current],
  editingNote: state.notes.editingNote,
  editingTitle: state.notes.editingTitle
})

const mapDispatchToProps = (dispatch) => ({
  handleNoteContentChange: (value) => dispatch(handleNoteContentChange(value)),
  handleNoteTitleChange: (value) => dispatch(handleNoteTitleChange(value)),
  toggleEditTitleMode: (isOn) => dispatch(toggleEditTitleMode(isOn)),
  deleteNote: () => dispatch(sendDeleteNoteRequest())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentNote)
