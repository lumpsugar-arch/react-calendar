import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import Auth from './Auth.jsx';

import '../less/App.less'

export default class App extends React.Component {
  render() {
    const LazyRoute = (props) => {
      const component = Loadable({
        loader: props.component,
        loading: () => <div>Loading&hellip;</div>,
      });

      return <Route {...props} component={component} />;
    };

    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <LazyRoute path='/register' component={() => import('./Register.jsx')} />
            <LazyRoute path='/login' component={() => import('./Login.jsx')} />
            <Auth>
              <LazyRoute path='/' component={() => import('./CalendarApp.jsx')} />
            </Auth>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}