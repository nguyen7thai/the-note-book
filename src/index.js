import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Dashboard from 'components/dashboard'
import styles from 'stylesheets/global.scss'
import 'normalize.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CurrentNote from 'components/CurrentNote'
import './service-worker/init'

const TheNoteBook = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path='/current-note/:id' component={CurrentNote} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  <TheNoteBook />,
  document.getElementById('app')
)
