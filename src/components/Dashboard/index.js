import React from 'react'
import styles from './index.scss'
import CSSModules from 'react-css-modules'
import SearchForm from 'components/SearchForm'
import NoteList from 'components/NoteList'
import CurrentNote from 'components/CurrentNote'
import NoteForm from 'components/NoteForm'
import { Route, Link } from 'react-router-dom'
import { Desktop } from 'utils/responsive'

const Dashboard = CSSModules(() => (
  <div styleName='bebe'>
    <SearchForm history={ history } />
    <div styleName='main-area'>
      <NoteList />
      <Desktop>
        <CurrentNote />
      </Desktop>
    </div>
  </div>
), styles)

export default Dashboard
