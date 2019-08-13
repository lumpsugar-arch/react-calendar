import React from 'react'
import axios from 'axios'
import { apiPrefix } from '../../../config/config.json'

import '../less/EventForm.less'

export default class EventPostForm extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDateStart = this.onChangeDateStart.bind(this);
    this.onChangeDateEnd = this.onChangeDateEnd.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      dateStart: new Date(),
      dateEnd: new Date(),
      userId: ''
    }
  }

  componentDidMount() {
    this.setState({
      userId: this.props.userId
    })
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

    const eventData = {
      title: this.state.title,
      dateStart: this.state.dateStart,
      dateEnd: this.state.dateEnd,
      userId: this.props.userId
    };

    axios.post(`${apiPrefix}/events/`, eventData)
      .then(res => this.props.onEventPost(res.data) )
      .catch(err => console.log(err))
  }

  render() {
    const hidden = this.props.hidden ? 'event-form--hidden' : '';

    return (
      <form onSubmit={ this.onSubmit } className={`form event-form ${hidden}`}>
        <div className='form__row'>
          <input
            className='form__input-text form__input-text--title'
            type='text'
            id='title'
            placeholder='Enter title here...'
            required
            onChange={ this.onChangeTitle }
          />
        </div>

        <div className='form__row'>
          <label htmlFor='date-start'>Start: </label>
          <input
            className='form__input-text'
            type='datetime-local'
            id='date=start'
            required
            value={ this.state.dateStart }
            onChange={ this.onChangeDateStart }
          />
        </div>

        <div className='form__row'>
          <label htmlFor='date-end'>End: </label>
          <input
            className='form__input-text'
            type='datetime-local'
            id='date-end'
            required
            value={ this.state.dateEnd }
            onChange={ this.onChangeDateEnd }
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
    )
  }
}