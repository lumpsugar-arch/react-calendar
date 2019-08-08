import React from 'react'
import moment, {parseTwoDigitYear} from 'moment'
import CalendarMonth from "./CalendarMonth.jsx";

import './CalendarGrid.less';

export default class CalendarGrid extends React.Component {
  constructor(props) {
    super(props);
    this.handleYearChange = this.handleYearChange.bind(this);
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
      <div>
        <input
          type='number'
          value={this.state.year}
          onChange={this.handleYearChange}
        />
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
