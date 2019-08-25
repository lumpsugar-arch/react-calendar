import React from 'react'

import Event from "./Event.jsx";

import '../less/EventList.less'

export default class EventList extends React.Component {
  constructor(props) {
    super(props);

    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.onEditButtonClick = this.onEditButtonClick.bind(this);
    this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this);
  }

  onAddButtonClick() {
    this.props.onAddButtonClick()
  }

  onEditButtonClick(event) {
    this.props.onEditButtonClick(event, true)
  }

  onRemoveButtonClick(event) {
    this.props.onRemoveButtonClick(event)
  }

  eventList() {
    if (this.props.events.length > 0) {
      return this.props.events.map((currentEvent, index) => {
        return <Event
          key={index}
          event={currentEvent}
          onEventRemove={this.onRemoveButtonClick}
          onEventEdit={this.onEditButtonClick}
        />
      })
    } else return (
      <div className='event-list--empty'>
        <span className='event-list__notice'>There are no events yet. </span>
        <a onClick={this.onAddButtonClick}>Let's add one!</a>
      </div>
    )

  }

  render() {
    return (
      <div className='events-wrapper'>
        <div className='event-list'>
          <div className='event-list__header'>
            <h2>Events</h2>
            <div className='event-list__button event-list__button--add'
                 onClick={this.onAddButtonClick}
                 title='Add new event'
            >
              <span>+</span>
            </div>
          </div>
          <ul className='event-list__list'>
            { this.eventList() }
          </ul>
        </div>
      </div>
    )
  }
}