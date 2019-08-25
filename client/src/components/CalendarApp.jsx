import React from 'react';
import axios from "axios";

import CalendarGrid from "./CalendarGrid.jsx";
import EventList from "./EventList.jsx";
import EventForm from "./EventForm.jsx";
import Notifications from "./Notifications.jsx";

import { getJwt}  from "./helpers/jwt";
import { apiPrefix } from '../../../config/config'
import { withRouter } from 'react-router-dom'
import { messages } from "./helpers/messages";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
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
      isEventFormVisible: false,
      messages: [],
      errors: []
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
      this.appendNewError(messages.ERROR_USER);
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
      });

      this.appendNewMessage(messages.SUCCESS_REMOVE)
    }
  }

  appendNewEvent(event) {
    this.setState(prevState => ({
      events: [...prevState.events, event]
    }));

    this.appendNewMessage(messages.SUCCESS_POST)
  }

  appendNewMessage(msg) {
    this.setState(prevState => ({
      messages: [...prevState.messages, msg]
    }));
  }

  appendNewError(err) {
    this.setState(prevState => ({
      errors: [...prevState.errors, err]
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
    });

    this.appendNewMessage(messages.SUCCESS_EDIT)
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
            <a className='link header__link'
               onClick={ this.handleLogout }
               title='Sign out'
            >
              <FontAwesomeIcon icon={ faSignOutAlt }/>
            </a>
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

        <Notifications
          messages={ this.state.messages }
          errors={ this.state.errors }
        />
      </div>
    )
  }
}

export default withRouter(CalendarApp)