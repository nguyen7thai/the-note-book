import algoliasearch from 'algoliasearch'

const APP_ID = 'HWRIATKE1B'
const CLIENT_API_KEY = '1bbc82864960e609d7a3eda53c16ce6a'
const client = algoliasearch(APP_ID, CLIENT_API_KEY)
const index = client.initIndex('notes')

export function search(keyword) {
  return index.search({
    query: keyword,
    restrictSearchableAttributes: ['title'],
    queryType: 'prefixAll'
  })
}
