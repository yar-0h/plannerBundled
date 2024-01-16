// svg dial code adapted from tutorial at
// import style from './css/AgendaBrief.module.css';

// https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/

import React from 'react'
import PropTypes from 'prop-types'

const AgendaBrief = (props) => {
  const catColors = ['#E06C75', '#E5C07B', '#56B6C2', '#61AFEF', '#C678DD', '#ABB2BF', '#282C34']
  // const dayColor = ["#2e4045", "#83adb5", "#c7bbc9", "#5e3c58", "#bfb5b2", "#c8c8c8"]

  const dayBuild = () => {
    const singleDay = []

    function drawSimpleEvent (event) {
      // let opa = 0.1;
      // if (minCount % 10 === 0) {
      //     opa = 0.2;
      // }
      const date = new Date(event.startTime).setHours(0, 0, 0, 0)

      const eventLength = String(Math.round((new Date(event.endTime) - new Date(event.startTime)) / 60000) * 100 / 1440) + '%' // minutes
      const eventStartY = String(Math.round((new Date(event.startTime) - new Date(date)) / 60000) * 100 / 1440) + '%'

      return (
        <svg key={'event_' + String(event.id)}>
            <rect x={0} y={eventStartY} width={'100%'} height={eventLength} style={{ fill: catColors[event.category], fillOpacity: '0.7' }} />\
        </svg>
      )
    }

    function drawCurrentTime () {
      const dayStart = new Date().setHours(0, 0, 0, 0)
      const currTime = String(((new Date() - dayStart) / 60000) * 100 / 1440 + '%')
      return (
        <svg key={'PreviewCurrentTime'}>
            <line key="previewCurrentTimeMarker" x1={0} y1={currTime} x2={'100%'} y2={currTime} style={{ stroke: 'yellow', strokeWidth: '2' }} />
        </svg>
      )
    }

    if (props.events !== null) {
      for (let i = 0; i < props.events.length; i++) {
        singleDay.push(drawSimpleEvent(props.events[i]))
      }
    }

    const currentDay = new Date()
    currentDay.setHours(0, 0, 0, 0)

    if (String(props.selectedDay).substring(0, 15) === String(currentDay).substring(0, 15)) {
      singleDay.push(drawCurrentTime())
    }

    return (
      singleDay
    )
  }

  return (
    <svg key='agendaBrief' width='100%' height='100%'>
        <rect width="100%" height="100%" fill={'#485B63'}/>
        {dayBuild()}
    </svg>
  )
}

// Prop types for Component
AgendaBrief.propTypes = {
  events: PropTypes.array,
  selectedDay: PropTypes.object
}

export default AgendaBrief
