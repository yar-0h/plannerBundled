import React from 'react'
import PropTypes from 'prop-types'
import style from './css/NavBar.module.css'

const NavBar = (props) => {
  return (
    <div className={style.container}>
      {/* <div onClick={props.selectHabitView} className={style.button}>HABITS</div>
      <div onClick={props.selectTaskView} className={style.button}>TASKS</div>
      <div onClick={props.selectYearView} className={style.button}>YEAR</div>
      <div onClick={props.selectMonthView} className={style.button}>MONTH</div>
      <div onClick={props.selectWeekView} className={style.button}>WEEK</div> */}
      <div className={style.brokenButton}>HABITS
        <span className={style.brokenTooltip}>WORK IN PROGRESS</span>
      </div>
      <div className={style.brokenButton}>TASKS
        <span className={style.brokenTooltip}>WORK IN PROGRESS</span>
      </div>
      <div className={style.brokenButton}>YEAR
        <span className={style.brokenTooltip}>WORK IN PROGRESS</span>
      </div>
      <div className={style.brokenButton}>MONTH
        <span className={style.brokenTooltip}>WORK IN PROGRESS</span>
      </div>
      <div className={style.brokenButton}>WEEK
        <span className={style.brokenTooltip}>WORK IN PROGRESS</span>
      </div>
      <div onClick={props.selectMeatView} className={style.button}>DAY</div>
    </div>
  )
}

// Prop types for Component
NavBar.propTypes = {
  selectHabitView: PropTypes.func,
  selectTaskView: PropTypes.func,
  selectYearView: PropTypes.func,
  selectMonthView: PropTypes.func,
  selectWeekView: PropTypes.func,
  selectMeatView: PropTypes.func
}

// Default Props for our Component
// Agenda.defaultProps = {
//   handleClose: function () { }
// }

export default NavBar
