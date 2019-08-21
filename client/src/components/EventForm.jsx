import React from 'react'
import moment from 'moment'
import axios from 'axios'

import { apiPrefix } from '../../../config/config.json'

import '../less/EventForm.less'

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDateStart = this.onChangeDateStart.bind(this);
    this.onChangeDateEnd = this.onChangeDateEnd.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: '',
      title: '',
      dateStart: '',
      dateEnd: ''
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.setState({
        id: this.props.event._id,
        title: this.props.event.title,

        dateStart: (this.props.event.dateStart)
          ? moment(this.props.event.dateStart).format(moment.HTML5_FMT.DATETIME_LOCAL)
          : '',

        dateEnd: (this.props.event.dateEnd)
          ? moment(this.props.event.dateEnd).format(moment.HTML5_FMT.DATETIME_LOCAL)
          : ''
      })
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
      _id: this.state.id,
      title: this.state.title,
      dateStart: this.state.dateStart,
      dateEnd: this.state.dateEnd,
      userId: this.props.userId
    };

    if (this.props.isEventEdit) {
      axios.put(`${apiPrefix}/events/${eventData._id}`, eventData)
        .then( res => {
          this.props.toggleForm();
          this.props.onEventEdit(res.data)
        } )
        .catch(err => console.log(err))
    } else {
      axios.post(`${apiPrefix}/events/`, eventData)
        .then( res => {
          this.props.toggleForm();
          this.props.onEventPost(res.data)
        } )
        .catch(err => console.log(err))
    }
  }

  render() {
    const hidden = this.props.isVisible ? '' : 'hidden',
          hiddenErr = this.state.error ? '' : 'hidden',
          headerTitle = this.props.isEventEdit ? 'Edit event' : 'Add new event';

    return (
      <div>
        <form onSubmit={ this.onSubmit } className={`form event-form event-edit-form ${hidden}`}>
          <div className='form__header'>
            <h1>{`${headerTitle}`}</h1>
          </div>

          <div className={`form__error-wrap ${hiddenErr}`}>
            <span className='form__error'>{ this.state.error }</span>
          </div>

          <div className='form__row'>
            <input
              className='form__input-text form__input-text--title'
              type='text'
              id='title'
              placeholder='Enter title here...'
              value={ this.state.title || '' }
              required
              onChange={ this.onChangeTitle }
            />
          </div>

          <div className='form__row'>
            <label htmlFor='date-start'>Start: </label>
            <input
              className='form__input-text'
              type='datetime-local'
              id='date-start'
              value={ this.state.dateStart || ''}
              required
              onChange={ this.onChangeDateStart }
            />
          </div>

          <div className='form__row'>
            <label htmlFor='date-end'>End: </label>
            <input
              className='form__input-text'
              type='datetime-local'
              id='date-end'
              value={ this.state.dateEnd || ''}
              required
              onChange={ this.onChangeDateEnd }
            />
          </div>

          <div className='form__submit-wrap'>
            <input
              type='submit'
              value='Save'
              className='button'
            />
          </div>
        </form>

        <div className={`overlay ${hidden}`} onClick={ this.props.toggleForm }> </div>
      </div>
    )
  }
}