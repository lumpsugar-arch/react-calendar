import React from 'react'
import axios from "axios";

import { apiPrefix } from '../../../config.json'

export default class EventEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDateStart = this.onChangeDateStart.bind(this);
    this.onChangeDateEnd = this.onChangeDateEnd.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: props.event._id,
      title: props.event.title,
      dateStart: new Date(),
      dateEnd: new Date()
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

    axios.put(`${apiPrefix}/${this.state._id}`, this.state)
      .then(res => console.log(res.data) )
      .catch(err => console.log(err))
  }

  render() {

    return (
      <form onSubmit={this.onSubmit} className={`form event-edit-form`}>
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
    )
  }
}