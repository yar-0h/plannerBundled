// ! STILL NOT FUNCTIONAL
import React, { useState } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import style from './css/Habit.module.css'
import EditHabit from './EditHabit'
import Utilities from '../Utilities'
import { Checkbox } from './Checkbox'
import { useQueryClient, useMutation } from 'react-query'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCheckCircle, faFire, faFireFlameSimple, faSquare, faX, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';

const Habit = (props) => {

  const [editHabitOpen, setEditHabitOpen] = useState(false)
  const [habitAccomplished, setAccomplished] = useState(
    props.record.filter(x => (
      (new Date(x.date).getFullYear() === new Date().getFullYear()) && 
      (new Date(x.date).getMonth() === new Date().getMonth()) &&
      (new Date(x.date).getDate() === new Date().getDate())
    )).length >= 1
  )

  const toggleAccomplished = () => {
    setAccomplished(!habitAccomplished)
  }

  const toggleEditHabit = () => {
    setEditHabitOpen(!editHabitOpen)
  }

  let streakCount = 0;
  const checkDay = new Date();

  const streakCountStyle = {
    color: 'white',
    fontSize: '12px'
  };

  const streakTrackerStyle = {
    color: 'rgb(240, 54, 7)',
    visibility: 'hidden'
  };

  const getProgress = () => {
    if (props.record.length < 1) {return}
    const max = props.record.reduce(function(prev, current) {
      return (prev && prev.date < current.date) ? prev : current
    })

    const earliestRecordDate = new Date(max.date)
    const timeDiff = new Date().getTime() - earliestRecordDate.getTime();
    let dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));

    if (dayDiff < 6) {dayDiff = 6}
    let content = [];
    let failureCheck = -1;
    let successCheck = 0;

    for (let i = 0; i < dayDiff; i++) {
      checkDay.setDate(new Date().getDate() - (dayDiff - i))
      let dayFilter = props.record.filter(x => ((new Date(x.date).getFullYear() === checkDay.getFullYear()) && (new Date(x.date).getMonth() === checkDay.getMonth()) &&
        ((new Date(x.date).getDate() === checkDay.getDate()))))

      if (dayFilter.length > 0) {
        successCheck++;
        failureCheck = 0;
        if ((dayDiff - i) < 7) {
          content.push(<div key={'progress_'+i}><FontAwesomeIcon icon={faCheckSquare} color='darkGreen'/></div>);
        }
      }

      else {
        if (failureCheck > -1) { failureCheck++; }
        if ((dayDiff - i) < 7) {

          if (failureCheck < props.period) {
            content.push(<div key={'progress_'+i}><FontAwesomeIcon icon={faSquare} color='rgba(57, 133, 52, 0.300)'/></div>);
          }

          else {
            successCheck = 0;
            content.push(<div key={'progress_'+i}><FontAwesomeIcon icon={faX} color='red'/></div>);
          }
        }
      }
    }

    if (successCheck > (props.period * 2)) {
      streakTrackerStyle.visibility = 'visible'
      streakCount = Math.floor(successCheck / props.period)
    }

    return content
  };


  const trackerArray = getProgress()



  const useRemoveRecord = () => {
    const queryClient = useQueryClient()
    return useMutation(removeRecord, {
      onSuccess: () => {
        toggleAccomplished()

        // queryClient.invalidateQueries('tasks');
        queryClient.setQueryData('habitRecords', (oldQueryData) => {
          return oldQueryData.filter((record) => record.id !== props.id)
        })
      }
    })
  }

  const removeRecord = async () => {
    return Axios.delete(
      `http://localhost:8080/habitRecords/${props.id}`
    )
  }

  const { mutate: deleteRecord } = useRemoveRecord()


  const useAddRecord = () => {
    const queryClient = useQueryClient()
    return useMutation(addRecord, {
      onSuccess: (data) => {
        toggleAccomplished()
        // queryClient.invalidateQueries('tasks');
        queryClient.setQueryData('habitRecords', (oldQueryData) => {
          return [...oldQueryData, data.data]
        })
      }
    })
  }

  const addRecord = async (record) => {
    return Axios.post(`http://localhost:8080/habitRecords/${props.id}`, record)
  }
  
  const { mutate:createRecord } = useAddRecord()  

  const accomplishHabit = async (e) => {

    e.preventDefault()

    if (!habitAccomplished) {
      const habitRecord = {
        date: Utilities.getCurrentDateTime()
      }
      
      createRecord(habitRecord)
    }

    else {
      deleteRecord()

    }

  }

  const habitStyle = () => {
    const dueStyle = style.habitNotDue

    // let dueStyle = style.habitNotDue

    // if (props.complete) { dueStyle = style.taskComplete } else if (((dueDate - new Date()) / 1000 / 60 / 60) > 24) { dueStyle = style.taskDue } else if (dueDate < new Date()) { dueStyle = style.taskOverdue }
    return dueStyle
  }

  return (
    <td className={style.habitContainerOuter}>
      <div className={style.editContainer}>
        {editHabitOpen && <EditHabit
                            id={props.id}
                            desc={props.desc}
                            period={props.period}
                            freq={props.freq}
                            handleClose={toggleEditHabit}
                          />}
      </div>

      <div className={style.habitContainerInner}>
        <div className={`${style.habitInfo}  ${habitStyle()}`}>

          <div onClick={toggleEditHabit} className={style.habitHeader}>
            <div style={streakTrackerStyle}>
              <span className="fa-layers" >
                <FontAwesomeIcon icon={faFire} color='back'/>
                <span className="fa-layers-text fa-inverse" data-fa-transform="shrink-8 down-3" style={streakCountStyle}>{streakCount}</span>
              </span>

            </div>
            <div onClick={toggleEditHabit} className={style.habitDesc}>
              {props.desc}
            </div>
          </div>

          <div className={style.habitFooter} onClick={toggleEditHabit}>
            {trackerArray || ([...Array(6)].map((_, i) => ( <div key={"norecord_"+i}><FontAwesomeIcon icon={faSquare} color='rgba(57, 133, 52, 0.300)'/></div> )))}
          </div>
        </div>

        <div className={style.checkboxContainer}>
          {Checkbox(habitAccomplished, accomplishHabit)}
        </div>
      </div>

    </td>
  )
}

// Prop types for Component
Habit.propTypes = {
  id: PropTypes.number,
  desc: PropTypes.string,
  period: PropTypes.number,
  freq: PropTypes.number,
  record: PropTypes.array
}

// Default Props for our Component
Habit.defaultProps = {
  record: []
}

export default Habit











