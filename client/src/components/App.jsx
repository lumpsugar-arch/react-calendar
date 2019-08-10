import React from 'react'

import './App.less'

import CalendarGrid from "./CalendarGrid.jsx";
import Events from "./Events.jsx";

const App = () => {
  return (
    <div className='app'>
      <CalendarGrid />
      <Events />
    </div>
  )
};

export default App