import { createAction } from 'redux-actions';
import { search as searchAlgolia } from 'api/algolia'

export const UPDATE_HITS_RESULT = 'UPDATE_HITS_RESULT'
export const TOGGLE_SEARCH_MODE = 'TOGGLE_SEARCH_MODE'
export const CHANGE_SEARCH_KEYWORD = 'CHANGE_SEARCH_KEYWORD'

export const sendSearchRequest = (keyword) => dispatch => {
  searchAlgolia(keyword).then((result) => {
    dispatch(updateHitsResult(result.hits))
  })
}

export const changeSearchKeyword = createAction(
  CHANGE_SEARCH_KEYWORD,
  keyword => keyword
)

export const updateHitsResult = createAction(
  UPDATE_HITS_RESULT,
  hits => hits
)

export const toggleSearchMode = createAction(
  TOGGLE_SEARCH_MODE,
  isOn => isOn
)

const initialState = {
  keyword: '',
  hits: [],
  isRequesting: false,
  searchMode: false
}

export const search = function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_HITS_RESULT :
      return {
        ...state,
        hits: action.payload
      }
    case TOGGLE_SEARCH_MODE :
      return {
        ...state,
        searchMode: action.payload
      }
    case CHANGE_SEARCH_KEYWORD :
      return {
        ...state,
        keyword: action.payload
      }
    default :
      return state
  }
}
