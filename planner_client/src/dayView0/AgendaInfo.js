// svg dial code adapted from tutorial at
// https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/
import Utilities from '../Utilities'
import React from 'react'
import PropTypes from 'prop-types'

export const AgendaInfo = (props) => {
  const dayColorBank = ['#f0d8dc', '#bec8f1', '#cddfc9', '#d0b0c1', '#a2bad2', '#d0eff3', '#efefe5']
  // const dayColorBank = ['#2e4045', '#83adb5', '#c7bbc9', '#5e3c58', '#bfb5b2', '#c8c8c8', '#3fad22']
  const catColor = ['#E06C75', '#E5C07B', '#56B6C2', '#61AFEF', '#C678DD', '#ABB2BF', '#282C34']
  const dayColor = dayColorBank[new Date(props.selectedDay).getDay()]

  const dayBuild = (date) => {
    const positions = 24 // hour count
    let count = 0 // simple counter for the numbers
    let minCount = 0 // counter for tracking minute labels
    let curY = 0 // vertical position tracker
    const xStart = 48 // horizontal tick line positioning
    let xEnd // end of each tick line
    const spacing = 20 // space between lines
    const hourLength = 25 // length of hour lines
    const halfHourLength = 20 // length of halfHour lines
    const otherLength = 15 // length of every other tick line
    const hourLocX = 5 // horizontal positioning for hour label
    const hourLocYOffset = 6 // vertical positioning offset for hour label
    const halfHourLocX = 5 // horizontal positioning for half hour label
    const halfHourLocYOffset = 6 // vertical positioning offset for half hour label

    const singleDay = []
    
    const daysEvents = props.events.filter(x =>
      (new Date(x.startTime).getMonth() === date.getMonth() &&
        new Date(x.startTime).getDate() === date.getDate()) ||
        (new Date(x.endTime).getMonth() === date.getMonth() &&
        new Date(x.endTime).getDate() === date.getDate())
    )

    function drawInteractionSpace () {
      let opacity = 0.1
      if (minCount % 10 === 0) {
        opacity = 0.15
      }
      const dateTime = new Date(date)
      dateTime.setHours(count, minCount, 0, 0)

      return (
        <svg key={'empty ' + dateTime}>
          <rect x={0} y={curY + 1} width={xStart} height={spacing} style={{ fill: 'rgba(0,0,0,0.3)', fillOpacity: '0.3' }} /> {/* extra tinted clickthrough space along time label */}
          <rect id={dateTime} x={0} y={curY + 1} width={'100%'} height={spacing}
            style={{ fill: 'rgb(0,0,0)', fillOpacity: opacity }}
            onClick={() => {
              props.setTimeDate(dateTime)
              props.toggleCreate()
            }}/>
        </svg>
      )
    }

    function drawLine (xLen) {
      return (
        <svg key={'tick ' + curY}>
            <line x1={xStart} y1={curY} x2={xLen} y2={curY} style={{ stroke: 'rgb(55,55,55)', strokeWidth: '1' }} />
        </svg>
      )
    }

    function drawCurrentTime () {
      const dayStart = new Date().setHours(0, 0, 0, 0)
      const currTime = (((props.today - dayStart) / 60000) * 1920 / 1440)
      const scrollAnchorY = (currTime > 300 ? currTime - 200 : currTime - 200)

      return (
        <svg key={'currentTime '}>
          <line id="currentTimeScrollAnchor" ref={props.setRef} x1={0} y1={scrollAnchorY} x2={'100%'} y2={scrollAnchorY} style={{ stroke: 'red', strokeWidth: '0' }} />
          <line id="currentTimeMarker" x1={0} y1={currTime} x2={'100%'} y2={currTime} style={{ stroke: 'yellow', strokeWidth: '1' }} />
          <rect x={0} y={currTime} width={xStart} height={spacing} style={{ fill: 'yellow' }} /> {/* extra tinted clickthrough space along time label */}
          <text x={hourLocX} y={currTime + hourLocYOffset + 10} style={{ stroke: 'grey', pointerEvents: 'none' }}>{Utilities.getCurrentTime().slice(0, 5)}</text>
        </svg>
      )
    }

    function drawHourLabel () {
      return (
        <svg key={'label ' + curY + ' ' + date}>
            <text x={hourLocX} y={curY + hourLocYOffset} style={{ pointerEvents: 'none' }}>{String(count).padStart(2, '0')}:00</text>
        </svg>
      )
    }

    function drawHalfHourLabel () {
      return (
        <svg key={'label ' + curY + ' ' + minCount + ' ' + date}>
            <text x={halfHourLocX} y={curY + halfHourLocYOffset} style={{ pointerEvents: 'none' }}>{String(count).padStart(2, '0')}:30</text>
        </svg>
      )
    }

    function drawEvent (event) {
      // let opa = 0.1;
      // if (minCount % 10 === 0) {
      //     opa = 0.2;
      // }

      let offsetCounter = 1
      for (let i = 0; i < daysEvents.length; i++) {
        if (daysEvents[i] === event) {
          break
        } else if (daysEvents[i].startTime <= event.startTime && event.startTime <= daysEvents[i].endTime) {
          offsetCounter += 0.125
        }
      }

      const dayStart = new Date(props.selectedDay).setHours(0, 0, 0, 0)

      const eventLength = String(Math.round((new Date(event.endTime) - new Date(event.startTime)) / 60000) * 1920 / 1440) // minutes
      const eventStartY = (Math.round((new Date(event.startTime) - dayStart) / 60000) * 1920 / 1440)
      const textfill = catColor[event.category] === '#282C34' ? 'white' : 'black'
      return (
        <svg key={'event bubble ' + event.id}>
          <defs>
            <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
              <path d="M-1,1 l2,-2
                  M0,4 l4,-4
                  M3,5 l2,-2"
                style={{ stroke: 'white', strokeWidth: '2' }}
              />
            </pattern>
          </defs>
          <rect x={75 * offsetCounter} y={eventStartY} width='80%' height={eventLength} style={{ stroke: 'black', fill: catColor[event.category], fillOpacity: 'i', pointerEvents: 'auto' }}
              onClick={() => {
                props.getProps(event)
                props.toggleEdit()
              }} />

          <rect x={75 * offsetCounter} y={eventStartY} width='80%' height={eventLength} style={{ stroke: 'black', fill: 'url(#diagonalHatch)', fillOpacity: '1', pointerEvents: 'auto' }}
              onClick={() => {
                props.getProps(event)
                props.toggleEdit()
              }} />

          <rect x={75 * offsetCounter} y={eventStartY} width='80%' height={15 * 1920 / 1440} style={{ stroke: 'black', fill: catColor[event.category], fillOpacity: '1', pointerEvents: 'auto' }}
              onClick={() => {
                props.getProps(event)
                props.toggleEdit()
              }} />
          <text x={90 * offsetCounter} y={eventStartY + 15} style={{ fill: textfill, pointerEvents: 'none' }}>{event.description}</text>
        </svg>
      )
    }

    // make a pack of lines for each number
    for (let i = 0; i < positions; i++) {
      singleDay.push(drawHourLabel())

      for (let j = 0; j < 4; j++) {
        singleDay.push(drawInteractionSpace())

        if (j === 0) {
          xEnd = xStart + hourLength
        } else if (j === 2) {
          xEnd = xStart + halfHourLength
          singleDay.push(drawHalfHourLabel())
        } else {
          xEnd = xStart + otherLength
        }

        singleDay.push(drawLine(xEnd))
        curY += spacing
        minCount += 15
      }

      count++
      minCount = 0
    }

    count = 0 // set the counter back to 00:00
    singleDay.push(drawHourLabel()) // one final number
    singleDay.push(drawLine(xStart + hourLength)) //  need 1 extra line for the last number

    // draw event bubbles on agenda space
    for (let i = 0; i < daysEvents.length; i++) {
      singleDay.push(drawEvent(daysEvents[i]))
    }

    // today's date, mark current time
    if (date.getMonth() === props.today.getMonth() && date.getDate() === props.today.getDate()) {
      singleDay.push(drawCurrentTime())
      // currentTimeScrollHeight += ((props.today - (new Date().setHours(0,0,0,0))) / 60000) * 1920/1440;

      // month before
    } else if (date.getMonth() < props.today.getMonth()) {
      // currentTimeScrollHeight += 1920;

      // same month, earlier day
    } else if (date.getMonth() === props.today.getMonth() && date.getDate() < props.today.getDate()) {
      // currentTimeScrollHeight += 1920;
    }

    return (
      singleDay
    )
  }

  return (
    <svg width='100%' height='1920'>
        <rect width="100%" height="100%" stroke="black" fill={dayColor}/>
        {dayBuild(props.selectedDay)}
    </svg>
  )
}

// Prop types for Component
AgendaInfo.propTypes = {
  events: PropTypes.array,
  today: PropTypes.object,
  selectedDay: PropTypes.object,
  setTimeDate: PropTypes.func,
  toggleCreate: PropTypes.func,
  getProps: PropTypes.func,
  toggleEdit: PropTypes.func,
  setRef: PropTypes.object
}

// Default Props for our Component
AgendaInfo.defaultProps = {
  events: { data: [] }
}

// props.updateDayList(dateArray)
