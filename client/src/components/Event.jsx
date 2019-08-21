import React from 'react'
import moment from "moment";
import axios from 'axios'

import { apiPrefix } from '../../../config/config.json'

export default class Event extends React.Component {
  constructor(props) {
    super(props);

    this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this);
    this.onEditButtonClick = this.onEditButtonClick.bind(this)
  }

  onRemoveButtonClick() {
    axios.delete(`${apiPrefix}/events/${this.props.event._id}`)
      .then(res => {
        this.props.onEventRemove(this.props.event)
      })
      .catch(err => console.log(err))
  }

  onEditButtonClick() {
    this.props.onEventEdit(this.props.event)
  }

  render() {
    return (
      <li className='event'>
        <div className="event__main">
          <div className='event__title'>
            {this.props.event.title}
          </div>

          <div className='event__date'>
            <span className='event__date-item'>
             from: {moment(this.props.event.dateStart).format('Do MMM YYYY, H:mm')}
            </span>

            <span className='event__date-item'>
              to: {moment(this.props.event.dateEnd).format('Do MMM YYYY, H:mm')}
            </span>
          </div>
        </div>

        <div className='event__control'>
          <a className='event__button event__button--edit'
             onClick={this.onEditButtonClick}
          >
            Edit
          </a>
          <a className='event__button event__button--remove'
             onClick={this.onRemoveButtonClick}
          >
            Remove
          </a>
        </div>
      </li>
    )
  }
}