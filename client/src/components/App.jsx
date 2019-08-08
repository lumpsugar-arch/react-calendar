import React from 'react'

import './App.less'

import CalendarGrid from "./CalendarGrid.jsx";
import EventForm from "./EventForm.jsx";
import EventList from "./EventList.jsx";

const App = () => {
  return (
    <div className='app'>
      <CalendarGrid />
      <div className='events'>
        {/*<EventForm />*/}
        {/*<EventList />*/}
      </div>
    </div>
  )
};

export default App