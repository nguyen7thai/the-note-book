import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { listeners, search, notes } from 'modules'

export default combineReducers({
  listeners,
  search,
  notes,
  form: formReducer
})

