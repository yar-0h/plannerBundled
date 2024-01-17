// svg dial code adapted from tutorial at
import AgendaBrief from './AgendaBrief'
import { AgendaBriefOverlay } from './AgendaBriefOverlay'
import React from 'react'
import PropTypes from 'prop-types'

// https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/
export const AgendaSidebar = (props) => {
  return (
    <svg width='100%' height='100%'>
      <AgendaBrief
          events = {props.events}
          selectedDay = {props.selectedDay}
      />;
      <AgendaBriefOverlay
        selectedDay = {props.selectedDay}
        todayButton = {props.todayButton}
        yesterdayButton = {props.yesterdayButton}
        tomorrowButton = {props.tomorrowButton}
        scrollboxY = {props.scrollboxY}
        scrollboxSize = {props.scrollboxSize}
      />
    </svg>
  )
}

// Prop types for Component
AgendaSidebar.propTypes = {
  events: PropTypes.array,
  todayButton: PropTypes.func,
  tomorrowButton: PropTypes.func,
  yesterdayButton: PropTypes.func,
  selectedDay: PropTypes.object,
  scrollboxY: PropTypes.number,
  scrollboxSize: PropTypes.number
}

// Default Props for our Component
// Agenda.defaultProps = {
//   handleClose: function () { }
// }
