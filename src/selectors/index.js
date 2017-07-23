import { createSelector } from 'reselect'

const getNotes = state => state.notes.all
const getHitIds = state => state.search.hits.map(h => h.objectID)
const getSearchMode = state => state.search.searchMode

export const getHitNotes = createSelector(
  [ getNotes, getHitIds, getSearchMode ],
  (notes, hitIds, searchMode) => {
    if (searchMode) {
      return hitIds.reduce((result, id) => {
        result[id] = notes[id]
        return result
      }, {})
    }
    return notes
  }
)

export const getNotesSortedIds = createSelector(
  [ getHitNotes ],
  (notes) => (
    Object.keys(notes).sort((a, b) => (
      (notes[b].updatedAt || 0) - (notes[a].updatedAt || 0)
    ))
  )
)
