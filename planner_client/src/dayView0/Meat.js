import React from 'react'
import PropTypes from 'prop-types'
import DailyChecks from './DailyChecks'
import style from './css/Meat.module.css'
import Agenda from './Agenda'

const Meat = (props) => {
  return (
    <div>
      <div className={style.container} >
        <DailyChecks
          tasks={props.tasks}
          habits={props.habits}
        />
        <Agenda
          currentTime= {props.currentTime}
          events={props.events}
          selectedDay= {props.selectedDay}
          selectDay = {props.selectDay}
          />
        <div className={style.foot} />
      </div>
    </div>
  )
}

// Prop types for Component
Meat.propTypes = {
  tasks: PropTypes.object.isRequired,
  habits: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
  currentTime: PropTypes.object,
  selectedDay: PropTypes.object,
  selectDay: PropTypes.func
}

// Default Props for our Component
Meat.defaultProps = {
  tasks: { data: [] },
  habits: { data: [] },
  events: { data: [] },
  currentTime: new Date(),
  selectedDay: new Date(),
  selectDay: function () { }
}

export default Meat
