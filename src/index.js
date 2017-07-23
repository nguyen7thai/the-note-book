import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Dashboard from 'components/dashboard'
import styles from 'stylesheets/global.scss'
import 'normalize.css'

const TheNoteBook = () => (
  <Provider store={store}>
    <Dashboard />
  </Provider>
)

ReactDOM.render(
  <TheNoteBook />,
  document.getElementById('app')
)
