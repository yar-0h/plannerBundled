import React, { useState } from 'react'
import PropTypes from 'prop-types'
import style from './css/TaskDaily.module.css'
import Task from './Task'
import CreateTask from './CreateTask'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'

const TaskDaily = (props) => {
  const [newTaskOpen, setNewTaskOpen] = useState(false)

  const toggleCreateTask = () => {
    setNewTaskOpen(!newTaskOpen)
  }

  // trim old, completed tasks (over 24 hrs)
  if (props.tasks) {
    //const sortedTasks = props.tasks.filter((task) => ((((new Date() - new Date(task.dateCompleted)) / 1000 / 60 / 60) < 24) && (task.complete === 1)) || (task.complete === 0))
    // console.log(sortedTasks)
    // props.tasks = props.tasks.filter((task) => ((((new Date() - new Date(task.dateCompleted)) / 1000 / 60 / 60) < 24) && (task.complete === 1)) || (task.complete === 0))

    props.tasks.sort(function (task1, task2) {
      if (task1.complete > task2.complete) return 1
      if (task1.complete < task2.complete) return -1

      if (task1.priority > task2.priority) return -1
      if (task1.priority < task2.priority) return 1

      if (task1.dateDue > task2.dateDue) return 1
      if (task1.dateDue < task2.dateDue) return -1

      return 0
    })
  }

  return (
    <div className={style.container}>
      {newTaskOpen && <CreateTask handleClose={toggleCreateTask}/>}
      <div className={style.taskContainer}>
        {/* {console.log(props.tasks)} */}
        {/* <table style={{width:'100%'}}> */}
        <table>
          <thead className={style.taskHead}>
            <tr>
              <td>
            TASKS
            </td>
            </tr>
          </thead>
          <tbody>
            {props.tasks &&
              props.tasks.map((e) => {
                // console.log(e)
                return (
                  <tr key={"task_" + e.id}>
                    <Task
                      id={e.id}
                      desc={e.description}
                      dateCreated={e.dateCreated}
                      dateDue={e.dateDue}
                      priority={e.priority}
                      dateCompleted={e.dateCompleted}
                      complete={e.complete}
                    />
                  </tr>
                )
              })
            }
            {!props.tasks &&
              <tr>
                <td> no tasks loaded </td>
              </tr>
            }
          </tbody>
        </table>
        <div className={style.newTaskButton}>
          <FontAwesomeIcon onClick={toggleCreateTask} icon={faSquarePlus} />
        </div>
      </div>
    </div>
  )
}

// Prop types for Component
TaskDaily.propTypes = {
  tasks: PropTypes.array
}

export default TaskDaily
