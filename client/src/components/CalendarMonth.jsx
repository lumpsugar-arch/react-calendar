import React from 'react'
import moment from 'moment'

import CalendarDay from "./CalendarDay.jsx";

import './CalendarMonth.less'

export default class CalendarMonth extends React.Component {
  constructor(props) {
    super(props);
  }

  getDays() {
    let days = [];
    for(let day = 1; day <= moment([this.props.year, this.props.month], 'YYYY-M').daysInMonth(); day++) {
      days.push(
        <span
          key={day}
          className='month__day'
        >
          {day}
        </span>
      )
    }
    return days
  }

  getBlanks() {
    let blanks = [];
    for(let i = 1; i < this.getFirstDayOfMonth(); i++) {
      blanks.push(
        <div
          key={i}
          className='month__day month__day--empty'
        >
          {''}
        </div>
      );
    }
    return blanks
  }

  getFirstDayOfMonth() {
    return moment([this.props.year, this.props.month], 'YYYY-M')
      .startOf('month')
      .format('E')
  }

  render() {
    return (
      <div className='month'>
        <h2>{this.props.title}</h2>
        <div className='month__days'>
          {this.getBlanks()}
          {this.getDays()}
        </div>
      </div>
    )
  }
}