import React from 'react';
import axios from "axios";

import CalendarGrid from "./CalendarGrid.jsx";
import EventList from "./EventList.jsx";
import EventForm from "./EventForm.jsx";

import { getJwt}  from "./helpers/jwt";
import { apiPrefix } from '../../../config/config'
import { withRouter } from 'react-router-dom'

import '../less/CalendarApp.less'

class CalendarApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleEventAction = this.handleEventAction.bind(this);
    this.handleEventRemove = this.handleEventRemove.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.appendNewEvent = this.appendNewEvent.bind(this);
    this.updateEventList = this.updateEventList.bind(this);
    this.toggleEventForm = this.toggleEventForm.bind(this);

    this.state = {
      events: [],
      username: '',
      userId: '',
      currentEventInForm: {},
      isEventFormVisible: false
    }
  }

  componentDidMount() {
    const jwt = getJwt();
    axios.get(`${apiPrefix}/users/getUser`, { headers: { Authorization: `Bearer ${jwt}` }
    }).then(res => {
      if (res.data.username) {
        this.setState({
          username: res.data.username,
          userId: res.data._id
        })
      }
    }).catch(err => {
      console.log(err);
      localStorage.removeItem('user-token');
      this.props.history.push('/login')
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.userId !== this.state.userId) {
      this.getEventsList()
    }
  }

  getEventsList() {
    axios.get(`${apiPrefix}/events/`, {
      params: {
        userId: this.state.userId
      }
    })
      .then(res => {
        this.setState({ events: res.data});
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleLogout() {
    localStorage.removeItem('user-token');
    this.props.history.push('/login')
  }

  handleEventAction(event, isEdit) {
    if (isEdit) {
      this.setState({
        isEventEdit: true
      })
    } else {
      this.setState({
        isEventEdit: false
      })
    }

    if (event) {
      this.setState({
        currentEventInForm: event
      });
    } else {
      this.setState({
        currentEventInForm: {}
      })
    }

    this.toggleEventForm()
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

  appendNewEvent(event) {
    this.setState(prevState => ({
      events: [...prevState.events, event]
    }));
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

  toggleEventForm() {
    this.setState({
      isEventFormVisible: !this.state.isEventFormVisible
    })
  }

  render() {
    return (
      <div className='calendar-app'>
        <header className='header'>
          <span className='header__welcome'>
            Welcome, { this.state.username }
            (<a className='link header__link' onClick={ this.handleLogout }>log out</a>)
          </span>
        </header>

        <div className='calendar-main'>
          <CalendarGrid
            events={ this.state.events }
            onDayClick={ this.handleEventAction }
          />
          <EventList
            events={ this.state.events }
            userId={ this.state.userId }
            onAddButtonClick={ this.handleEventAction }
            onEditButtonClick={ this.handleEventAction }
            onRemoveButtonClick={ this.handleEventRemove }
          />
        </div>

        <EventForm
          event={ this.state.currentEventInForm }
          userId={ this.state.userId }
          isVisible={ this.state.isEventFormVisible }
          isEventEdit={ this.state.isEventEdit }
          toggleForm={ this.toggleEventForm }
          onEventPost={ this.appendNewEvent }
          onEventEdit={ this.updateEventList }
        />
      </div>
    )
  }
}

export default withRouter(CalendarApp)