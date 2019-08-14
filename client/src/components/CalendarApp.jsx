import React from 'react'

import CalendarGrid from "./CalendarGrid.jsx";
import Events from "./Events.jsx";
import axios from "axios";

import { getJwt}  from "./helpers/jwt";
import { apiPrefix } from '../../../config/config'
import { withRouter } from 'react-router-dom'

import '../less/CalendarApp.less'

class CalendarApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleEventPost = this.handleEventPost.bind(this);
    this.handleEventRemove = this.handleEventRemove.bind(this);
    this.updateEventList = this.updateEventList.bind(this);

    this.state = {
      events: [],
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState._id !== this.state._id) {
      this.getEventsList()
    }
  }

  getEventsList() {
    axios.get(`${apiPrefix}/events/`, {
      params: {
        userId: this.state._id
      }
    })
      .then(response => {
        this.setState({ events: response.data});
      })
      .catch((err) => console.log(err))
  }

  handleLogout() {
    localStorage.removeItem('user-token');
    this.props.history.push('/login')
  }

  handleEventPost(event) {
    this.setState(prevState => ({
      events: [...prevState.events, event]
    }));
  }

  handleEventRemove(event) {
    if (this.state.events.length > 0) {
      const newEventList = this.state.events.filter(e => {
        return e !== event
      });

      this.setState({
        events: [...newEventList]
      })
    }
  }

  updateEventList(event) {
    this.setState(prevState => {
      const newEvents = prevState.events;
      newEvents.forEach((el, index, arr) => {
        if (el._id === event._id) {
          arr[index] = event
        }
      });
      return newEvents
    })
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

        <div className='calendar-main'>
          <CalendarGrid events={this.state.events} />
          <Events
            events={this.state.events}
            userId={this.state._id}
            onEventPost={this.handleEventPost}
            onEventRemove={this.handleEventRemove}
            updateEventsList={this.updateEventList}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(CalendarApp)