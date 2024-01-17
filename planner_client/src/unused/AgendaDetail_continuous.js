// svg dial code adapted from tutorial at
// https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/
import Utilities from '../Utilities'
import React from 'react'

export const AgendaDetail = (props) => {
  //   Tue Apr 25 2023 13:23:44 GMT-0400 (Eastern Daylight Time)

  // const oldestDate = new Date(props.events.data.reduce((prev, curr) => prev.startTime < curr.startTime ? prev : curr).startTime);
  // const newestDate = new Date(props.events.data.reduce((prev, curr) => prev.endTime > curr.endTime ? prev : curr).endTime);
  // oldestDate.setHours(0,0,0,0); //sanitize oldestDate and newestDate
  // newestDate.setHours(0,0,0,0);

  // const mostRecentDate = Math.max(props.today.getTime(), newestDate.getTime())
  // const timeDif = mostRecentDate - oldestDate.getTime();
  // const availableDays = Math.ceil(timeDif / (1000 * 3600 * 24)) + 7;
  // let dateArray = [];
  // let dateTracker = oldestDate;
  // for (let i = 0; i < availableDays; i++) {
  //     dateArray.push(dateTracker);
  //     dateTracker = Utilities.addOneDay(dateTracker);
  // }
  const dayCluster = []
  const dateArray = Utilities.getDateArray(props.events)

  // console.log(dateArray);

  const dayColor = ['#2e4045', '#83adb5', '#c7bbc9', '#5e3c58', '#bfb5b2', '#c8c8c8']

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

    const daysEvents = props.events.data.filter(x =>
      (new Date(x.startTime).getMonth() === date.getMonth() &&
            new Date(x.startTime).getDate() === date.getDate()) ||
            (new Date(x.endTime).getMonth() === date.getMonth() &&
            new Date(x.endTime).getDate() === date.getDate())
    )

    function drawInteractionSpace () {
      let opacity = 0.1
      if (minCount % 10 === 0) {
        opacity = 0.2
      }
      const dateTime = new Date(date)
      dateTime.setHours(count, minCount, 0, 0)

      return (
                <svg key={'empty ' + dateTime}>
                    <rect x={0} y={curY + 1} width={xStart} height={spacing} style={{ fill: 'rgb(25,85,40)', fillOpacity: '0.3' }} /> {/* extra tinted clickthrough space along time label */}
                    <rect id={dateTime} x={0} y={curY + 1} width={'100%'} height={spacing}
                          style={{ fill: 'rgb(25,85,40)', fillOpacity: opacity }}
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
                    <line x1={xStart} y1={curY} x2={xLen} y2={curY} style={{ stroke: 'rgb(255,0,0)', strokeWidth: '2' }} />
                </svg>
      )
    }

    function drawCurrentTime () {
      const dayStart = new Date().setHours(0, 0, 0, 0)
      const currTime = (((props.today - dayStart) / 60000) * 1920 / 1440)
      const scrollAnchorY = (currTime > 300 ? currTime - 200 : currTime - 200)
      return (
                <svg key={'currentTime '}>
                    <line id="currentTimeScrollAnchor" x1={0} y1={scrollAnchorY} x2={'100%'} y2={scrollAnchorY} style={{ stroke: 'red', strokeWidth: '0' }} />
                    <line id="currentTimeMarker" x1={0} y1={currTime} x2={'100%'} y2={currTime} style={{ stroke: 'yellow', strokeWidth: '3' }} />
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

      const eventLength = (Math.round((new Date(event.endTime) - new Date(event.startTime)) / 60000) * 1920 / 1440) // minutes
      const eventStartY = (Math.round((new Date(event.startTime) - new Date(date)) / 60000) * 1920 / 1440)

      return (

                <svg key={'event bubble ' + event.description}>
                    {/* <rect x={0} y={curY + 1} width={xStart} height={spacing} style={{fill:"rgb(25,85,40)", fillOpacity:"0.3"}} /> */}
                    {/* <rect id={date + " " + String(count).padStart(2, '0') + ":" + String(minCount).padStart(2, '0')} x={0} y={curY + 1} width={10000} height={spacing} style={{fill:"rgb(25,85,40)", fillOpacity:"0.1"}} /> */}
                    <rect x={100} y={eventStartY} width={200} height={eventLength} style={{ fill: 'rgb(0,0,0)', fillOpacity: '0.3', pointerEvents: 'auto' }}
                        onClick={() => {
                          props.getProps(event)
                          props.toggleEdit()
                          console.log(event)
                        }} />
                    {/* <rect x={145} y={45 * (1920/1440)} width={200} height={300} style={{fill:"rgb(0,0,0)"}} /> */}
                    <text x={120} y={eventStartY + 5} style={{ fill: 'rgb(200,200,200)', pointerEvents: 'none' }}>{event.description}</text>
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

  for (let i = 0; i < dateArray.length; i++) {
    dayCluster.push(
            <svg width='100%' height='1920' key={'day ' + i}>
                <rect width="100%" height="100%" fill={dayColor[i % 5]} key={'daybacking ' + i}/>
                {dayBuild(dateArray[i])}
            </svg>
    )
  }
  // props.updateDayList(dateArray);

  return dayCluster
}
