import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'
import style from './css/Task.module.css'
import EditTask from './EditTask'
import Utilities from '../Utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { Checkbox } from './Checkbox'

import { useQueryClient, useMutation } from 'react-query'

const Task = (props) => {
  const dueDate = new Date(props.dateDue)

  let dueString = 'DUE: ' + (dueDate.getMonth() + 1) + '/' + dueDate.getDate()

  if (new Date().getFullYear() !== dueDate.getFullYear()) {
    dueString += '/' + dueDate.getFullYear()
  }

  const [editTaskOpen, setEditTaskOpen] = useState(false)
  const [taskComplete, setTaskComplete] = useState(Boolean(props.complete))

  const priorityColors = ['#00000000', '#fdc500', '#fd8c00', '#dc0000', '#780000', '#00ac46']

  const taskStyle = () => {
    let dueStyle = style.taskNotDue

    if (props.complete) { dueStyle = style.taskComplete } else if
    (((dueDate - new Date().setHours(0, 0, 0, 0)) / 1000 / 60 / 60) === 0) { dueStyle = style.taskDue } else if
    (dueDate < new Date()) { dueStyle = style.taskOverdue }
    return dueStyle
  }
  // let handleCompleteTask = async () => {
  //   let completeTime = Utilities.getCurrentDateTime();

  //   if (taskComplete) {
  //     completeTime = Utilities.dtlToMysql(props.dateCompleted);
  //   }

  //   try {
  //     const { status } = await Axios.put(
  //           `http://localhost:8080/tasks/${props.id}`, {
  //             description: props.desc,
  //             dateDue: Utilities.dtlToMysql(props.dateDue),
  //             priority: props.priority,
  //             dateCompleted: completeTime,
  //             complete: !taskComplete,
  //           }
  //     );
  //     if (status === 200) {
  //           setTaskComplete(!taskComplete);
  //           console.log("task completion status updated successfully");
  //     } else {
  //         console.log("error encountered")
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const useUpdateTask = () => {
    const queryClient = useQueryClient()
    return useMutation(updateTask, {
      onSuccess: (data) => {
        // queryClient.invalidateQueries('tasks');

        setTaskComplete(!taskComplete)
        queryClient.setQueryData('tasks', (oldQueryData) => {
          const taskIdToUpdate = data.data.id // the ID of the task to update

          const updatedTasks = oldQueryData.map((task) => {
            if (task.id === taskIdToUpdate) {
              // create a new object for the updated task
              return data.data
            }
            return task
          })

          return updatedTasks
        })
      }
    })
  }

  const updateTask = async (task) => {
    return Axios.put(
        `http://localhost:8080/tasks/${props.id}`, task
    )
  }

  const { mutate } = useUpdateTask()

  const completeTask = async (e) => {
    e.preventDefault()

    let completeTime = Utilities.getCurrentDateTime()

    if (taskComplete) {
      completeTime = Utilities.dtlToMysql(props.dateCompleted)
    }
    const task = {
      description: props.desc,
      dateDue: Utilities.dtlToMysql(props.dateDue),
      priority: props.priority,
      dateCompleted: completeTime,
      complete: !taskComplete
    }
    mutate(task)
  }

  const toggleEditTask = () => {
    setEditTaskOpen(!editTaskOpen)
  }

  return (
    // <div className={style.container}>
    <td className={style.taskContainerOuter}>
      <div className={style.editContainer}>
        {editTaskOpen && <EditTask
                          id={props.id}
                          desc={props.desc}
                          dateDue={props.dateDue}
                          dateCompleted={props.dateCompleted}
                          priority={props.priority}
                          handleClose={toggleEditTask}
                          complete = {props.complete}
                          />}
      </div>

      <div className={style.taskContainerInner}>
        <div className={`${style.taskInfo}  ${taskStyle()}`}>
          <div className={style.priorityFlag}>
            <FontAwesomeIcon
              size='lg'
              icon={faBookmark}
              style={{ color: priorityColors[props.priority] }}>
            </FontAwesomeIcon>
          </div>

          <div>
            <div className={style.taskHeader} onClick={toggleEditTask}>
                {props.desc}
            </div>

            <div className={style.taskFooter} onClick={toggleEditTask}>
              {dueString}
            </div>
          </div>
        </div>

        <div className={style.checkboxContainer}>
          {/* <div className={style.checkboxAnchor} */}
          {Checkbox(props.complete, completeTask)}
          {/* <span className={style.checkbox}/>  */}
        </div>

      </div>
    </td>
  )
}

// Prop types for Component
Task.propTypes = {
  events: PropTypes.object,
  id: PropTypes.number,
  desc: PropTypes.string,
  priority: PropTypes.number,
  dateDue: PropTypes.string,
  dateCompleted: PropTypes.string,
  complete: PropTypes.number
}

// Default Props for our Component
// Agenda.defaultProps = {
//   handleClose: function () { }
// }

export default Task
