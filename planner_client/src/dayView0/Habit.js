// ! STILL NOT FUNCTIONAL
import React, { useState } from 'react'
// import Axios from 'axios'
import PropTypes from 'prop-types'
import style from './css/Habit.module.css'
import EditHabit from './EditHabit'
import { Checkbox } from './Checkbox'
// import { useQueryClient, useMutation } from 'react-query'

const Habit = (props) => {
  const [editHabitOpen, setEditHabitOpen] = useState(false)
  const [habitAccomplished, setAccomplished] = useState(false)

  const toggleAccomplished = () => {
    setAccomplished(!habitAccomplished)
  }

  const toggleEditHabit = () => {
    setEditHabitOpen(!editHabitOpen)
  }

  // ! MAKE THIS BLOCK FUNCTIONAL AFTER YOU DESIGN A GOOD HABIT SYSTEM, DUH
  // const useUpdateHabit = () => {
  //   const queryClient = useQueryClient()
  //   return useMutation(updateHabit, {
  //     onSuccess: (data) => {
  //       // queryClient.invalidateQueries('tasks');

  //       setTaskComplete(!taskComplete)
  //       queryClient.setQueryData('tasks', (oldQueryData) => {
  //         const taskIdToUpdate = data.data[0].id // the ID of the task to update

  //         const updatedTasks = oldQueryData.data.map((task) => {
  //           if (task.id === taskIdToUpdate) {
  //             // create a new object for the updated task
  //             return data.data[0]
  //           }
  //           return task
  //         })

  //         return {
  //           ...oldQueryData,
  //           data: updatedTasks
  //         }
  //       })
  //     }
  //   })
  // }

  // const updateHabit = async (task) => {
  //   return Axios.put(
  //       `http://localhost:8080/habits/${props.id}`, task
  //   )
  // }

  // const { mutate } = useUpdateHabit()

  // const accomplishHabit = async (e) => {
  //   e.preventDefault()

  //   let completeTime = Utilities.getCurrentDateTime()

  //   if (taskComplete) {
  //     completeTime = Utilities.dtlToMysql(props.dateCompleted)
  //   }
  //   const task = {
  //     description: props.desc,
  //     dateDue: Utilities.dtlToMysql(props.dateDue),
  //     priority: props.priority,
  //     dateCompleted: completeTime,
  //     complete: !taskComplete
  //   }
  //   mutate(task)
  // }

  const accomplishHabit = async (e) => {
    toggleAccomplished()
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

          <div className={style.habitHeader}>
            <div onClick={toggleEditHabit} className={style.habitDesc}>
              {props.desc}
            </div>
          </div>

          <div className={style.habitFooter} onClick={toggleEditHabit}>
            ----
          </div>
        </div>

        <div className={style.checkboxContainer}>
          {Checkbox(habitAccomplished, accomplishHabit)}
        </div>
      </div>

      {/* {console.log(props)} */}
    </td>
  )
}

// Prop types for Component
Habit.propTypes = {
  id: PropTypes.number,
  desc: PropTypes.string,
  period: PropTypes.number,
  freq: PropTypes.number
}

// Default Props for our Component
// Agenda.defaultProps = {
//   handleClose: function () { }
// }

export default Habit
