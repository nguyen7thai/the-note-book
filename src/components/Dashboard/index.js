import React from 'react'
import styles from './index.scss'
import CSSModules from 'react-css-modules'
import SearchForm from 'components/SearchForm'
import NoteList from 'components/NoteList'
import CurrentNote from 'components/CurrentNote'
import NoteForm from 'components/NoteForm'

const Dashboard = CSSModules(() => (
  <div styleName='bebe'>
    <SearchForm />
    <div styleName='main-area'>
      <NoteList />
      <CurrentNote />
    </div>
  </div>
), styles)

export default Dashboard
