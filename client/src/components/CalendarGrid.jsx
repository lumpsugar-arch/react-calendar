import React from 'react'
import moment from 'moment'
import CalendarMonth from "./CalendarMonth.jsx";

import '../less/CalendarGrid.less';

export default class CalendarGrid extends React.Component {
  constructor(props) {
    super(props);
    this.handleYearChange = this.handleYearChange.bind(this);

    // change the start of the week to Monday
    moment.updateLocale('en', {
      week: {
        dow: 1
      }
    });

    this.state = {
      year: moment().format('YYYY'),
      month: moment().format('M')
    }
  }

  handleYearChange(e) {
    this.setState({
      year: e.target.value
    })
  }

  render() {
    const months = moment.months();

    return (
      <div className='calendar-wrapper'>
        <div className='year-selector'>
          <label htmlFor="year-selector">
            Year:
          </label>
          <input
            className='year-selector__input'
            type='number'
            value={this.state.year}
            onChange={this.handleYearChange}
            id='year-selector'
            min='0'
            max='9999'
          />
        </div>

        <div className='calendar-grid'>
          {
            months.map((month, index) =>
              <CalendarMonth
                key={index}
                year={this.state.year}
                month={index + 1}
                title={month}
              />
            )
          }
        </div>
      </div>
    )
  }
}
