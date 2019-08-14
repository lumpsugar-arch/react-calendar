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
    this.toggleEditForm = this.toggleEditForm.bind(this);

    this.state = {
      isPostFormVisible: false,
      isEditFormVisible: false,
      eventEdit: {},
    };
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
      isPostFormVisible: !this.state.isPostFormVisible
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
          visible={this.state.isEditFormVisible}
          onOverlayClick={this.toggleEditForm}
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
            <div className='event-list__button event-list__button--add'
                 onClick={this.togglePostForm}>
              <span>+</span>
            </div>
          </div>
          <EventPostForm
            onEventPost={this.handleEventPost}
            visible={this.state.isPostFormVisible}
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