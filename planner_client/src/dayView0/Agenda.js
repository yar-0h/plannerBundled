import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import style from './css/Agenda.module.css'
import { AgendaInfo } from './AgendaInfo'
import CreateEvent from './CreateEvent'
import EditEvent from './EditEvent'
import Utilities from '../Utilities'
import { AgendaSidebar } from './AgendaSidebar'

// 15 minute chunks
// 96 15min chunks in day

const Agenda = (props) => {
  const [newEventOpen, setNewEventOpen] = useState(false)
  const [editEventOpen, setEditEventOpen] = useState(false)
  const [chosenEventProps, setChosenEventProps] = useState(null)
  const [newEventTime, setNewEventTime] = useState(null)

  const [scrollboxY, setScrollBoxY] = useState(0)
  const [scrollboxSize, setScrollBoxSize] = useState(null)

  const [hex, setHex] = useState('#ABB2BF')

  // const [dayList, setDayList] = useState( Utilities.getDateArray(props.events));

  const [daysEvents, setDaysEvents] = useState(null)

  const currentTimeRef = useRef()

  useEffect(() => {
    const scrollToElement = () => {
      currentTimeRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    scrollToElement()
  }, [currentTimeRef, props.selectedDay])

  // found this section at https://stackoverflow.com/questions/73247936/how-to-dynamically-track-width-height-of-div-in-react-js
  // useRef allows us to "store" the div in a constant,
  // and to access it via observedDiv.current
  const observedDiv = useRef(null)

  useEffect(() => {
    if (!observedDiv.current) {
      // we do not initialize the observer unless the ref has
      // been assigned
      return
    }

    // we also instantiate the resizeObserver and we pass
    // the event handler to the constructor
    const resizeObserver = new ResizeObserver(() => {
      if (window.innerHeight !== scrollboxSize) {
        setScrollBoxSize(window.innerHeight)
      }
    })

    // the code in useEffect will be executed when the component
    // has mounted, so we are certain observedDiv.current will contain
    // the div we want to observe
    resizeObserver.observe(observedDiv.current)

    // if useEffect returns a function, it is called right before the
    // component unmounts, so it is the right place to stop observing
    // the div
    return function cleanup () {
      resizeObserver.disconnect()
    }
  },
  // only update the effect if the ref element changed
  [observedDiv.current])

  // useEffect(() => {
  //     generateDaysEvents(props.selectedDay)

  // })

  const toggleEditEvent = () => {
    setEditEventOpen(!editEventOpen)
  }
  // const [currentDay, setCurrentDay] = useState(props.currentTime);

  const toggleCreateEvent = () => {
    setNewEventOpen(!newEventOpen)
  }

  const getProps = (eventDetails) => {
    setChosenEventProps(eventDetails)
  }

  const setTimeDate = (timeDate) => {
    setNewEventTime(timeDate)
  }

  const goYesterday = () => {
    props.selectDay(Utilities.subtractOneDay(props.selectedDay))
  }

  const goTomorrow = () => {
    props.selectDay(Utilities.addOneDay(props.selectedDay))
  }

  const goToday = () => {
    props.selectDay(props.currentTime)
  }

  useEffect(() => {
    const generateDaysEvents = (dayOfEvents) => {
      // console.log(currentDay);
      if (props.events) {
        setDaysEvents(props.events.data.filter(x =>
          (new Date(x.startTime).getMonth() === dayOfEvents.getMonth() &&
                        new Date(x.startTime).getDate() === dayOfEvents.getDate()) ||
                        (new Date(x.endTime).getMonth() === dayOfEvents.getMonth() &&
                        new Date(x.endTime).getDate() === dayOfEvents.getDate())))
      }
    }
    generateDaysEvents(props.selectedDay)
  }, [props.events, props.selectedDay])

  let agendaInfo = null
  if (props.events) {
    agendaInfo = <AgendaInfo
                        events = {props.events}
                        today = {props.currentTime}
                        selectedDay= {props.selectedDay}
                        toggleEdit = {toggleEditEvent}
                        toggleCreate = {toggleCreateEvent}
                        setTimeDate = {setTimeDate}
                        getProps = {getProps}
                        setRef={currentTimeRef}
                        hex={hex}
                     />
  }

  let agendaSidebar = null

  if (props.events) {
    agendaSidebar = <AgendaSidebar
                        events = {daysEvents}
                        selectedDay = {props.selectedDay}
                        todayButton = {goToday}
                        yesterdayButton = {goYesterday}
                        tomorrowButton = {goTomorrow}
                        scrollboxY = {scrollboxY}
                        scrollboxSize = {scrollboxSize}
                        />
  }

  return (
    <div className={style.container}>
      {newEventOpen && <CreateEvent eventStart={newEventTime} handleClose={toggleCreateEvent}/>}
      {editEventOpen && <EditEvent {...chosenEventProps} handleClose={toggleEditEvent} setHex={setHex} hex={hex}/>}

      <div className={style.agendaSidebarContainer}>
          {agendaSidebar}
      </div>

      <div className={style.agendaInfoContainer}
        ref={observedDiv}
        onScroll={(e) =>
          setScrollBoxY(Math.floor(e.target.scrollTop))
        }
      >
      {agendaInfo}
      </div>
    </div>
  )
}

// Prop types for Component
Agenda.propTypes = {
  events: PropTypes.object,
  currentTime: PropTypes.object,
  selectedDay: PropTypes.object,
  selectDay: PropTypes.func
}

export default Agenda
