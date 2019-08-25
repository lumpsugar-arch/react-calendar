import React from 'react'
import moment from "moment";
import axios from 'axios'

import { apiPrefix } from '../../../config/config.json'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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
            <div className='event__date-item'>
              <span className="event__date-label">from:</span>
              <span className="event__date-value">
                {moment(this.props.event.dateStart).format('Do MMM YYYY, H:mm')}
              </span>
            </div>

            <div className='event__date-item'>
              <span className="event__date-label">to:</span>
              <span className="event__date-value">
                {moment(this.props.event.dateEnd).format('Do MMM YYYY, H:mm')}
              </span>
            </div>
          </div>
        </div>

        <div className='event__control'>
          <a className='event__button event__button--edit'
             onClick={this.onEditButtonClick}
             title='Edit'
          >
            <FontAwesomeIcon icon={ faPen } />
          </a>
          <a className='event__button event__button--remove'
             onClick={this.onRemoveButtonClick}
             title='Remove'
          >
            <FontAwesomeIcon icon={ faTrash } />
          </a>
        </div>
      </li>
    )
  }
}