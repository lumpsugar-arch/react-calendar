import React from 'react'

import EventPostForm from "./EventPostForm.jsx"
import EventEditForm from "./EventEditForm.jsx";
import Event from "./Event.jsx";

import '../less/Events.less'

export default class Events extends React.Component {
  constructor(props) {
    super(props);

    this.updateEventList = this.updateEventList.bind(this);
    this.handleEventPost = this.handleEventPost.bind(this);
    this.handleEventRemove = this.handleEventRemove.bind(this);
    this.handleEventEdit = this.handleEventEdit.bind(this);
    this.togglePostForm = this.togglePostForm.bind(this);

    this.state = {
      form: {
        hidden: true
      },
      isEditFormVisible: false,
      eventEdit: {},
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userId !== this.props.userId) {

    }
  }

  handleEventPost(event) {
    this.props.onEventPost(event)
  }

  handleEventEdit(event) {
    this.setState({
      eventEdit: event
    });
    this.toggleEditForm();
  }

  handleEventRemove(event) {
    this.props.onEventRemove(event)
  }

  updateEventList(event) {
    this.props.updateEventsList(event)
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
          onEventEditPost={this.updateEventList}
        />
      )
    }
  }

  eventList() {
    return this.props.events.map((currentEvent, index) => {
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
            userId={this.props.userId}
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