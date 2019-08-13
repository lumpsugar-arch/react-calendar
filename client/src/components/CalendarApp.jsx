import React from 'react'

import CalendarGrid from "./CalendarGrid.jsx";
import Events from "./Events.jsx";
import axios from "axios";

import { getJwt}  from "./helpers/jwt";
import { apiPrefix } from '../../../config/config'
import { withRouter } from 'react-router-dom'

class CalendarApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      username: '',
      _id: ''
    }
  }

  componentDidMount() {
    const jwt = getJwt();
    axios.get(`${apiPrefix}/users/getUser`, { headers: { Authorization: `Bearer ${jwt}` }
    }).then(res => {
      if (res.data.username) {
        this.setState({
          username: res.data.username,
          _id: res.data._id
        })
      }
    }).catch(err => {
      localStorage.removeItem('user-token');
      this.props.history.push('/login')
    })
  }

  handleLogout() {
    localStorage.removeItem('user-token');
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className='calendar-app'>
        <header className='header'>
          <span className='header__welcome'>
            Welcome, { this.state.username }
            (<a className='link header__link' onClick={ this.handleLogout }>logout</a>)
          </span>
        </header>
        <CalendarGrid />
        <Events userId={this.state._id} />
      </div>
    )
  }
}

export default withRouter(CalendarApp)