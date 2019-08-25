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
    return this.props.events.map((currentEvent, index) => {
      return <Event
        key={index}
        event={currentEvent}
        onEventRemove={this.onRemoveButtonClick}
        onEventEdit={this.onEditButtonClick}
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
                 onClick={this.onAddButtonClick}>
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