import React from 'react'
import axios from "axios"
import moment from 'moment'

import { apiPrefix } from '../../../config/config.json'

export default class EventEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDateStart = this.onChangeDateStart.bind(this);
    this.onChangeDateEnd = this.onChangeDateEnd.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onOverlayClick = this.onOverlayClick.bind(this);

    this.state = {
      _id: props.event._id,
      title: props.event.title,
      dateStart: moment(props.event.dateStart).format(moment.HTML5_FMT.DATETIME_LOCAL),
      dateEnd: moment(props.event.dateEnd).format(moment.HTML5_FMT.DATETIME_LOCAL)
    }
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeDateStart(e) {
    this.setState({
      dateStart: e.target.value
    })
  }

  onChangeDateEnd(e) {
    this.setState({
      dateEnd: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    if (new Date(this.state.dateStart).getTime() > new Date(this.state.dateEnd).getTime()) {
      this.setState({
        error: 'The end date should be bigger than the start date'

      });
      return
    } else this.setState({
      error: ''
    });

    const eventData = {
      title: this.state.title,
      dateStart: this.state.dateStart,
      dateEnd: this.state.dateEnd,
    };

    axios.put(`${apiPrefix}/events/${this.state._id}`, eventData)
      .then( this.props.onEventEditPost(this.state) )
      .catch(err => console.log(err))
  }

  onOverlayClick() {
    this.props.onOverlayClick()
  }

  render() {
    const hidden = this.props.visible ? '' : 'hidden',
          hiddenErr = this.state.error ? '' : 'hidden';

    return (
      <div>
        <form onSubmit={this.onSubmit} className={`form event-form event-edit-form ${hidden}`}>
          <div className='form__header'>
            <h1>Edit event</h1>
          </div>

          <div className={`form__error-wrap ${hiddenErr}`}>
            <span className='form__error'>{this.state.error}</span>
          </div>

          <div className='form__row'>
            <input
              className='form__input-text form__input-text--title'
              type='text'
              id='title'
              value={this.state.title}
              required
              onChange={this.onChangeTitle}
            />
          </div>

          <div className='form__row'>
            <label htmlFor='date-start'>Start: </label>
            <input
              className='form__input-text'
              type='datetime-local'
              id='date-start'
              required
              value={this.state.dateStart}
              onChange={this.onChangeDateStart}
            />
          </div>

          <div className='form__row'>
            <label htmlFor='date-end'>End: </label>
            <input
              className='form__input-text'
              type='datetime-local'
              id='date-end'
              required
              value={this.state.dateEnd}
              onChange={this.onChangeDateEnd}
            />
          </div>

          <div className='form__row'>
            <input
              type='submit'
              value='Save'
              className='button'
            />
          </div>
        </form>

        <div className={`overlay ${hidden}`} onClick={this.onOverlayClick}> </div>
      </div>
    )
  }
}