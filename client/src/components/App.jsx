import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import CalendarApp from './CalendarApp.jsx'
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Auth from './Auth.jsx';

import '../less/App.less'

export default class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Auth>
              <Route path='/' component={CalendarApp} />
            </Auth>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}