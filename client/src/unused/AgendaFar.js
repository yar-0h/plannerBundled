import style from './css/AgendaFar.module.css'
import React from 'react'
import PropTypes from 'prop-types'

const AgendaFar = (props) => {
  const eventTimes = []
  const eventLengths = []

  if (props.events) {
    for (let i = 0; i < props.events.data.length; i++) {
      const timeStart = new Date(props.events.data[i].startTime)
      eventTimes.push(timeStart.getHours() + (timeStart.getMinutes() / 60))
    }

    for (let i = 0; i < props.events.data.length; i++) {
      const timeEnd = new Date(props.events.data[i].endTime)
      eventLengths.push((timeEnd.getHours() + (timeEnd.getMinutes() / 60)) - eventTimes[i])
    }
  }

  return (
    <div className={style.container}>
      <svg width='9%' height='90%' className={style.canvas}>
        {eventTimes.map((start, index) => {
          const eventLength = eventLengths[index]
          return (
            <rect key={index} x="0" y={start / 24 * 510} width="80%" height={eventLength / 24 * 510} fillOpacity="50%"/>
          )
        })}

        <rect key={props.handPosition} x="2" y={props.handPosition / 24 * 510} rx='5' width="95%" height='1' stroke="orange" fillOpacity="50%"/>

      </svg>
    </div>
  )
}

// Prop types for Component
AgendaFar.propTypes = {
  events: PropTypes.object,
  handPosition: PropTypes.object
}

// Default Props for our Component
// Agenda.defaultProps = {
//   handleClose: function () { }
// }

export default AgendaFar
