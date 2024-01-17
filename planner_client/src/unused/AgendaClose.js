import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CreateEvent from '../dayView0/CreateEvent'
import EditEvent from '../dayView0/EditEvent'

import style from './css/AgendaClose.module.css'
import Custscroll from './Custscroll'

// const { remote } = require('electron')

const agendaArr = []
for (let i = 0; i <= 1440; i += 15) {
  const hour = i / 60
  const processedHour = parseInt(hour).toString().padStart(2, '0')
  const processedMinutes = (i % 60).toString().padStart(2, '0')
  agendaArr.push(processedHour + ':' + processedMinutes)
}

const hourArr = []
for (let i = 0; i <= 24; i += 0.5) {
  // ? 248.6 is the offset for table to orient agenda events, should be more responsive
  // ? 246.1 is the offset after adding simple forward/back buttons

  hourArr.push(i * 246.1)
}

// console.log(remote.getCurrentWindow().getSize());

const AgendaClose = (props) => {
  const [newEventOpen, setNewEventOpen] = useState(false)
  const [editEventOpen, setEditEventOpen] = useState(false)
  const [chosenEventProps, setChosenEventProps] = useState(null)
  const [newEventTime, setNewEventTime] = useState(null)

  const toggleEditEvent = () => {
    setEditEventOpen(!editEventOpen)
  }

  const toggleCreateEvent = () => {
    setNewEventOpen(!newEventOpen)
  }

  const getProps = (eventDetails) => {
    setChosenEventProps(eventDetails)
  }

  const eventTimes = []
  const eventLengths = []
  const eventData = []

  if (props.events) {
    for (let i = 0; i < props.events.data.length; i++) {
      const timeStart = new Date(props.events.data[i].startTime)
      eventTimes.push(timeStart.getHours() + (timeStart.getMinutes() / 60))
    }

    for (let i = 0; i < props.events.data.length; i++) {
      const timeEnd = new Date(props.events.data[i].endTime)
      eventLengths.push((timeEnd.getHours() + (timeEnd.getMinutes() / 60)) - eventTimes[i])
    }

    for (let i = 0; i < props.events.data.length; i++) {
      eventData.push(props.events.data[i])
    }
  }

  return (

    <div className={style.outerContainer}>
      <Custscroll>
        <div className={style.innerContainer}>
        {newEventOpen && <CreateEvent eventStart={newEventTime} handleClose={toggleCreateEvent}/>}
        {editEventOpen && <EditEvent {...chosenEventProps} handleClose={toggleEditEvent}/>}
            {/* <button className={style.yesterdayButton}> -YESTERDAY- </button> */}
            <table className={style.agendaTable}>
            <colgroup>
              <col key={'col'} span={'1'} className={style.timeColumn} />
            </colgroup>
            <thead>
              <tr key={'svg'}>
                <th>
                  <svg width='99%' height='100%' viewBox="0 0 800 6040" className={style.agendaBG} style={{ pointerEvents: 'none' }}>
                    {hourArr.map(e => {
                      return (
                        <rect key={'rect' + e} x="85" y={e + 3} rx='10' width="640" height="3" />
                      )
                    })}

                    {eventTimes.map((start, index) => {
                      // console.log(eventTimes);
                      const eventLength = eventLengths[index]
                      // console.log(start);

                      // console.log(eventLengths);

                      return (
                        <svg className='box' key={'eventContainer' + index}>
                          <rect key={index} x="85" y={start * 248.84} rx='10' width="640" height={eventLength * 248.84} fillOpacity="50%" style={{ pointerEvents: 'auto' }} onClick={() => {
                            getProps(eventData[index])
                            toggleEditEvent()
                          }
                            }
                          />
                          <text key={'text ' + index} x="180" y={(start * 248.84) + ((eventLength * 248.84) / 2)} fill="white" fontSize={24} >{eventData[index].description}</text>
                        </svg>
                      )
                    })}

                    <rect key={'currentTime'} x="60" y={props.handPosition * 248.84} rx='5' width="690" height='5' stroke='red' fill='orange' fillOpacity="100%" />
                    <rect key={'yest'} x="698" y="0" rx='5' width="90" height='90' stroke='red' fill='orange' fillOpacity="100%" />
                    <rect key={'tomo'} x="698" y="5950" rx='5' width="90" height='90' stroke='red' fill='orange' fillOpacity="100%" />

                    {/* <rect x="150" y="250" rx='10' width="640" height="3" /> */}
                    {/* <g stroke="black" fill="red" strokeWidth="2">
                        <path d="M539,1 L1,1 L1,329 L463,329 L493,300 L539,300 Z" />
                      </g> */}
                  </svg>
                </th>
              </tr>
            </thead>

            <tbody>
              {agendaArr.map((e, i) => {
                return (
                  <tr key={i}>
                    <td className={style.timeCell} onClick={() => {
                      setNewEventTime(e)
                      toggleCreateEvent()
                    }
                    }>
                      {i % 2 === 0 && e}
                    </td>
                    <td className={style.agendaCell} onClick={() => {
                      setNewEventTime(e)
                      toggleCreateEvent()
                    }
                    }>  -  </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {/* <button className={style.tomorrowButton}> -TOMORROW- </button> */}

      </Custscroll>
    </div>
  )
}

// Prop types for Component
AgendaClose.propTypes = {
  events: PropTypes.object,
  handPosition: PropTypes.object
}

// Default Props for our Component
// Agenda.defaultProps = {
//   handleClose: function () { }
// }

export default AgendaClose
