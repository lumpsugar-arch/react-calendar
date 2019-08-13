import React from 'react'
import moment from 'moment'

import '../less/CalendarMonth.less'

export default class CalendarMonth extends React.Component {
  constructor(props) {
    super(props);
    this.currentDate = moment();
    this.date = moment([this.props.year, this.props.month], 'YYYY-M');
  }

  getDays() {
    let days = [];

    for(let day = 1; day <= this.date.daysInMonth(); day++) {
      const current = (
        this.currentDate.isSame(moment([this.props.year, this.props.month - 1, day]),
        'day'))
        ?
          'month__day--current'
        :
          '';
      days.push(
        <span
          key={day}
          className={`month__day ${current}`}
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

  getWeekDays() {
    let weekdays = [];
    moment.weekdaysShort(true).forEach((el, index) => {
      weekdays.push(
        <span
          key={index}
          className='month__weekday'
        >
          {el}
        </span>
      )
    });
    return weekdays
  }

  render() {
    const currentMonth = (+this.currentDate.format('M') === this.props.month) ? 'month__title--current' : '';

    return (
      <div className='month'>
        <h2 className={`month__title ${currentMonth}`}>
          {this.props.title}
        </h2>

        <div className='month__weekdays'>
          {this.getWeekDays()}
        </div>

        <div className='month__days'>
          {this.getBlanks()}
          {this.getDays()}
        </div>
      </div>
    )
  }
}