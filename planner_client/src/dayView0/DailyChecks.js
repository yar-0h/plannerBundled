import React from 'react'
import PropTypes from 'prop-types'
import style from './css/DailyChecks.module.css'
import HabitDaily from './HabitDaily'
import TaskDaily from './TaskDaily'

const DailyChecks = (props) => {
  return (
    <div className={style.container}>
        <HabitDaily
          habits={props.habits}
          habitRecords={props.habitRecords}
        />
        <TaskDaily
          tasks={props.tasks}
        />
    </div>
  )
}

// Prop types for Component
DailyChecks.propTypes = {
  habits: PropTypes.array,
  habitRecords: PropTypes.array,
  tasks: PropTypes.array
}

// Default Props for our Component
// Agenda.defaultProps = {
//   handleClose: function () { }
// }

export default DailyChecks
