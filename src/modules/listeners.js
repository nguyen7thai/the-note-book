import { createAction } from 'redux-actions'
import { listenToNotes } from 'api/firebase'
import { addMultipleNotes } from 'modules/notes'

export const ADD_LISTENER = 'ADD_LISTENER'

export const addListener = createAction(
  ADD_LISTENER,
  listenerId => listenerId
)

export const setAndHandleNotesListener = () => (dispatch, getState) => {
  if (getState().listeners.notes === true) {
    return
  }
  dispatch(addListener('note'))
  listenToNotes((notes) => {
    dispatch(addMultipleNotes(notes))
  })
}

export function listeners(state = {}, action) {
  switch (action.type) {
    case ADD_LISTENER :
      return {
        ...state,
        [action.payload]: true
      }
    default :
      return state
  }
}
