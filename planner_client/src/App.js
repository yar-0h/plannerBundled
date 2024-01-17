import style from './css/App.module.css'

import Meat from './dayView0/Meat'
// import Bone from './Bone'
import WeekView from './weekView/WeekView'
import MonthView from './monthView/MonthView'
import YearView from './yearView/YearView'
import TaskView from './taskView/TaskView'
import HabitView from './habitView/HabitView'
import NavBar from './NavBar'

import Axios from 'axios'
import { React, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

export default function App () {
  const [currentView, setView] = useState('agenda')
  // const [handPosition, setHandPosition] = useState(new Date().getHours() + ((new Date()).getMinutes()/60));
  const [currentTime, setCurrentTime] = useState(new Date())
  // const [currentColor, setCurrentColor] = useState("red");
  const [selectedDay, setSelectedDay] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => tick(), 60000)
    return () => clearInterval(interval)
  })

  function tick () {
    // setCurrentTime((new Date()).getHours() + ((new Date()).getMinutes()/60));
    setCurrentTime(new Date())
    // if (currentColor == "red") {setCurrentColor("green");}
    // else if (currentColor == "green") {setCurrentColor("blue");}
    // else if (currentColor == "blue") {setCurrentColor("grey");}
    // else if (currentColor == "grey") {setCurrentColor("red");}
  }

  function selectDay (date) {
    setSelectedDay(date)
  }

  function selectMeatView () {
    setView('meat')
  }

  // function selectBoneView () {
  //   setView('bone')
  // }

  function selectWeekView () {
    setView('week')
  }

  function selectMonthView () {
    setView('month')
  }

  function selectYearView () {
    setView('year')
  }

  function selectTaskView () {
    setView('task')
  }

  function selectHabitView () {
    setView('habit')
  }

  async function fetchEvents () {
    const { data } = await Axios.get(
      'http://localhost:8080/events'
    )

    return data
  }

  async function fetchTasks () {
    const { data } = await Axios.get(
      'http://localhost:8080/tasks'
    )
    // console.log("FETCHING TASKS")

    return data
  }

  // async function fetchGoals() {
  //   const { data } = await Axios.get(
  //     "http://localhost:8080/goals"
  //   );
  //   return data;
  // }

  async function fetchHabits () {
    const { data } = await Axios.get(
      'http://localhost:8080/habits'
    )
    // console.log("FETCHING HABITS")

    return data
  }

  // QUERY RESPONSES CONTAIN:
  // data,
  // error,
  // failureCount,
  // isError,
  // isFetchedAfterMount,
  // isFetching,
  // isIdle,
  // isLoading,
  // isPreviousData,
  // isStale,
  // isSuccess,
  // refetch,
  // remove,
  // status,
  const eventsResponse = useQuery('events', fetchEvents, { cacheTime: 5000 })
  const tasksResponse = useQuery('tasks', fetchTasks)
  // const goalsResponse = useQuery("getGoals", fetchGoals)
  const habitsResponse = useQuery('habits', fetchHabits, { cacheTime: 5000 })

  let view
  switch (currentView) {
    case 'week':
      view = <WeekView
                events={ eventsResponse.data }
              />
      break

    case 'month':
      view = <MonthView
        events={ eventsResponse.data }
        currentMonth = {new Date().getMonth() + 1}
        currentDay = {new Date().getDate()}
      />
      break

    case 'year':
      view = <YearView/>
      break

    case 'task':
      view = <TaskView/>
      break

    case 'habit':
      view = <HabitView/>
      break

    default:
      view =
      <div className={style.MeatContainer}>
        <Meat
          events={ eventsResponse.data }
          tasks={ tasksResponse.data }
          habits={ habitsResponse.data }
          selectedDay= {selectedDay}
          selectDay = {selectDay}
          currentTime= {currentTime}
          // currentColor= {currentColor}

          // goals={ goalsResponse.data }
        />
        </div>
  }

  return (
    <div className={style.App}>
      {/* {console.log(eventsResponse)} */}
      {/* {eventsResponse.data && console.log(eventsResponse.data)} */}
      <NavBar
        selectMeatView={selectMeatView}
        selectWeekView={selectWeekView}
        selectMonthView={selectMonthView}
        selectYearView={selectYearView}
        selectTaskView={selectTaskView}
        selectHabitView={selectHabitView}
      />

      {view}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  )
}
