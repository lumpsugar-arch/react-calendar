import React from 'react'
import axios from "axios";

import { apiPrefix } from '../../../config.json'
import EventPostForm from "./EventPostForm.jsx"
import EventEditForm from "./EventEditForm.jsx";
import Event from "./Event.jsx";

import './Events.less'

export default class Events extends React.Component {
  constructor(props) {
    super(props);

    this.handleEventPost = this.handleEventPost.bind(this);
    this.handleEventRemove = this.handleEventRemove.bind(this);
    this.handleEventEdit = this.handleEventEdit.bind(this);
    this.togglePostForm = this.togglePostForm.bind(this);

    this.state = {
      events: [],
      form: {
        hidden: true
      },
      isEditFormVisible: false,
      eventEdit: {}
    };
  }

  componentDidMount() {
    axios.get(`${apiPrefix}`)
      .then(response => {
        this.setState({ events: response.data})
      })
      .catch((err) => console.log(err))
  }

  handleEventPost(event) {
    this.setState(prevState => ({
      events: [...prevState.events, event]
    }));
  }

  handleEventEdit(event) {
    this.setState({
      eventEdit: event
    });
    this.toggleEditForm();
  }

  handleEventRemove(event) {
    const newEventList = this.state.events.filter(e => {
      return e !== event
    });

    this.setState({
      events: [...newEventList]
    })
  }

  togglePostForm() {
    this.setState({
      form: {
        hidden: false
      }
    })
  }

  toggleEditForm() {
    this.setState({
      isEditFormVisible: !this.state.isEditFormVisible
    })
  }

  displayEditForm() {
    if (this.state.isEditFormVisible) {
      return (
        <EventEditForm
          event={this.state.eventEdit}
        />
      )
    }
  }

  eventList() {
    return this.state.events.map((currentEvent, index) => {
      return <Event
        key={index}
        event={currentEvent}
        onEventRemove={this.handleEventRemove}
        onEventEdit={this.handleEventEdit}
      />
    })
  }

  render() {
    return (
      <div className='events-wrapper'>
        <div className='event-list'>
          <div className='event-list__header'>
            <h2>Events</h2>
            <div
              className='event-list__button event-list__button--add'
              onClick={this.togglePostForm}
            >
              +
            </div>
          </div>
          <EventPostForm
            onEventPost={this.handleEventPost}
            hidden={this.state.form.hidden}
          />
          <ul className='event-list__list'>
            { this.eventList() }
          </ul>
        </div>
        {this.displayEditForm()}
      </div>
    )
  }
}