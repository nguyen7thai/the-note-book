import { createAction } from 'redux-actions'
import { saveNote, updateNote, removeNote } from 'api/firebase'
import { toggleSearchMode } from 'modules/search'

export const ADD_MULTIPLE_NOTES = 'ADD_MULTIPLE_NOTES'
export const SELECT_NOTE = 'SELECT_NOTE'
export const HANDLE_NOTE_CONTENT_CHANGE = 'HANDLE_NOTE_CONTENT_CHANGE'
export const UPDATE_NOTE_CONTENT = 'UPDATE_NOTE_CONTENT'
export const TOGGLE_EDITING_NOTE = 'TOGGLE_EDITING_NOTE'
export const HANDLE_NOTE_TITLE_CHANGE = 'HANDLE_NOTE_TITLE_CHANGE'
export const TOGGLE_EDIT_TITLE_MODE = 'TOGGLE_EDIT_TITLE_MODE'
export const DELETE_NOTE = 'DELETE_NOTE'

export const addMultipleNotes = createAction(
  ADD_MULTIPLE_NOTES,
  notes => notes
)

export const selectNote = createAction(
  SELECT_NOTE,
  id => id
)

export const updateNoteContent = createAction(
  UPDATE_NOTE_CONTENT,
  value => value
)

export const toggleEditingNote = createAction(
  TOGGLE_EDITING_NOTE,
  isOn => isOn
)

export const toggleEditTitleMode = createAction(
  TOGGLE_EDIT_TITLE_MODE,
  isOn => isOn
)

export const handleNoteTitleChange = createAction(
  HANDLE_NOTE_TITLE_CHANGE,
  value => value
)

export const deleteNote = createAction(
  DELETE_NOTE,
  id => id
)

let savedTimeout = null
export const handleNoteContentChange = (content) => (dispatch, getState) => {
  clearTimeout(savedTimeout)

  dispatch(updateNoteContent(content))

  savedTimeout = setTimeout(() => {
    updateNote(getState().notes.current, content).then(() => {
      dispatch(toggleEditingNote(false))
    })
  }, 3000)
}

export const createNewNote = (title, content) => dispatch => {
  const updatedAt = Date.now()
  const { key, promise } = saveNote(title, content, updatedAt)
  dispatch(toggleSearchMode(false))
  promise.then((data) => {
    dispatch(addMultipleNotes({ [key]: { title, content, updatedAt } }))
    dispatch(selectNote(key))
  })
}

export const sendDeleteNoteRequest = () => (dispatch, getState) => {
  const id = getState().notes.current
  removeNote(id).then(() => dispatch(deleteNote(id)))
}

const initialState = {
  all: {},
  current: null,
  editingNote: false,
  editingTitle: false,
  sortedIds: []
}

export function notes(state=initialState, action) {
  switch (action.type) {
    case ADD_MULTIPLE_NOTES:
      return {
        ...state,
        all: {
          ...state.all,
          ...action.payload
        }
      }
    case SELECT_NOTE:
      return {
        ...state,
        current: action.payload
      }
    case UPDATE_NOTE_CONTENT:
      return {
        ...state,
        editingNote: true,
        all: {
          ...state.all,
          [state.current]: {
            ...state.all[state.current],
            content: action.payload
          }
        }
      }
    case TOGGLE_EDITING_NOTE:
      return {
        ...state,
        editingNote: action.payload
      }
    case TOGGLE_EDIT_TITLE_MODE:
      return {
        ...state,
        editingTitle: action.payload
      }
    case HANDLE_NOTE_TITLE_CHANGE:
      return {
        ...state,
        editingNote: true,
        all: {
          ...state.all,
          [state.current]: {
            ...state.all[state.current],
            title: action.payload
          }
        }
      }
    case DELETE_NOTE:
      let newNotes = {...state.all}
      delete newNotes[state.current]
      return {
        ...state,
        current: null,
        all: newNotes
      }
    default:
      return state
  }
}
