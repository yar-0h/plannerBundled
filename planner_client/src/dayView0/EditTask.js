import React, { useState } from 'react'
import Axios from 'axios'
import style from './css/EditTask.module.css'
import Utilities from '../Utilities'

import Circle from '@uiw/react-color-circle'

import { useQueryClient, useMutation } from 'react-query'
import PropTypes from 'prop-types'

const EditTask = (props) => {
  const [description, setDescription] = useState(props.desc)
  const [dateDue, setDateDue] = useState(props.dateDue)
  const [priority, setPriority] = useState(props.priority)
  // const [message, setMessage] = useState("");

  const priorityColors = ['#6e6e6d', '#fdc500', '#fd8c00', '#dc0000', '#780000', '#00ac46']

  const useUpdateTask = () => {
    const queryClient = useQueryClient()
    return useMutation(updateTask, {
      onSuccess: (data) => {
        // queryClient.invalidateQueries('tasks');
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

  const { mutate: updateSubmit } = useUpdateTask()

  const editTask = async (e) => {
    e.preventDefault()
    const task = {
      description,
      dateDue: Utilities.formatDate(dateDue),
      priority,
      dateCompleted: props.dateCompleted,
      complete: props.complete
    }

    updateSubmit(task)
    props.handleClose()
  }

  const useRemoveTask = () => {
    const queryClient = useQueryClient()
    return useMutation(removeTask, {
      onSuccess: () => {
        // queryClient.invalidateQueries('tasks');
        queryClient.setQueryData('tasks', (oldQueryData) => {
          return oldQueryData.filter((task) => task.id !== props.id)
        })
      }
    })
  }

  const removeTask = async () => {
    return Axios.delete(
            `http://localhost:8080/tasks/${props.id}`
    )
  }

  const { mutate: deleteSubmit } = useRemoveTask()

  const deleteTask = async (e) => {
    e.preventDefault()
    deleteSubmit()
    props.handleClose()
  }

  return (
    <div className={style.popupContainer} onClick={props.handleClose}>
      <div className={style.container} onClick={(e) => e.stopPropagation()}>
        <div className={style.header} style={{ backgroundColor: priorityColors[priority] }}>{description}</div>
        <form onSubmit={editTask}>
          <div className={style.form} style={{ backgroundColor: 'darkgray' }}>
            <div className={style.title}>
              <div className={`${style.description} ${style.field}`}>
                <input
                  type='text'
                  size='42'
                  placeholder={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className={style.dateDue}>
              <div className={style.fieldLabel}>D U E:</div>
              <div className={style.field}>
                <input
                  type='date'
                  value={dateDue.substring(0, 10)}
                  onChange={(e) => setDateDue(e.target.value)}
                />
              </div>
            </div>
            <div className={style.priority}>
              <div className={style.fieldLabel}>P R I O R I T Y:</div>
              <Circle
                className={style.field}
                colors={priorityColors}
                color={priorityColors[priority]}
                onChange={(color) => {
                  setPriority(priorityColors.indexOf(color.hex))
                }}
              />
            </div>
            <div>
              <div className={style.notice}>
                {<p>{}</p>}
              </div>
              <div className={style.buttons}>
                <button type="submit">Update Task</button>
                <div/>
                <button type="button" onClick={deleteTask}>Delete Task</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// Prop types for Component
EditTask.propTypes = {
  id: PropTypes.number,
  desc: PropTypes.string,
  dateDue: PropTypes.string,
  priority: PropTypes.number,
  dateCompleted: PropTypes.string,
  complete: PropTypes.number,
  handleClose: PropTypes.func
}

// Default Props for our Component
// Agenda.defaultProps = {
//   handleClose: function () { }
// }

export default EditTask
