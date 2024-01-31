import React, { useState } from 'react'
import Axios from 'axios'
import style from './css/CreateTask.module.css'
import Utilities from '../Utilities'

import Circle from '@uiw/react-color-circle'

import { useQueryClient, useMutation } from 'react-query'
import PropTypes from 'prop-types'

const CreateTask = (props) => {
  const dateCreated = Utilities.getCurrentDateTime()
  const [description, setDescription] = useState('n e w  t a s k')
  const [dateDue, setDateDue] = useState(new Date().toISOString().substring(0, 10))
  const [priority, setPriority] = useState(0)
  // const [message, setMessage] = useState('')

  // const [message, setMessage] = useState("");

  const priorityColors = ['#6e6e6d', '#fdc500', '#fd8c00', '#dc0000', '#780000', '#00ac46']

  const useAddTask = () => {
    const queryClient = useQueryClient()
    return useMutation(addTask, {
      onSuccess: (data) => {
        // queryClient.invalidateQueries('tasks');
        queryClient.setQueryData('tasks', (oldQueryData) => {
          return [...oldQueryData, data.data]
        })
      }
    })
  }

  const addTask = async (task) => {
    return Axios.post('http://localhost:8080/tasks', task)
  }

  // const addTask = async (task) => {
  //     try {
  //         const { status } = await Axios.post(
  //             "http://localhost:8080/tasks", task
  //         );
  //         if (status === 200) {
  //             setDescription("");
  //             setDateDue("");
  //             setPriority("");
  //             setMessage("task created successfully");
  //         } else {
  //             setMessage("error encountered")
  //         }
  //     } catch (err) {
  //         console.log(err);
  //     }
  // }

  const { mutate } = useAddTask()

  const createTask = async (e) => {
    e.preventDefault()

    const task = { description, dateCreated, dateDue, priority }
    mutate(task)
    props.handleClose()
  }

  // let createTask = async (e) => {
  //     e.preventDefault();
  //     try {
  //         const { status } = await Axios.post(
  //             "http://localhost:8080/tasks", {
  //                 description: description,
  //                 dateCreated: dateCreated,
  //                 dateDue: dateDue,
  //                 priority: priority,
  //             }
  //         );
  //         if (status === 200) {
  //             setDescription("");
  //             setDateDue("");
  //             setPriority("");
  //             setMessage("task created successfully");
  //         } else {
  //             setMessage("error encountered")
  //         }
  //     } catch (err) {
  //         console.log(err);
  //     }
  // };

  //   return (
  //         <div className={style.popupContainer}>
  //             <div className={style.container}>
  //                 <button className={style.btnClose} onClick={props.handleClose}>X</button>
  //                 {/* <form onSubmit={submitNewTask}> */}
  //                 <form onSubmit={createTask}>
  //                     <input
  //                         type='text'
  //                         value={description}
  //                         placeholder="Description"
  //                         onChange={(e) => setDescription(e.target.value)}
  //                     />
  //                     <input
  //                         type='date'
  //                         value={dateDue}
  //                         placeholder="Due Date"
  //                         onChange={(e) => setDateDue(e.target.value)}
  //                     />
  //                     <input
  //                         type='number'
  //                         value={priority}
  //                         placeholder="Priority"
  //                         onChange={(e) => setPriority(e.target.value)}
  //                     />
  //                     <button type="submit">Create</button>
  //                     <div className="message">
  //                         {/* {message ? <p>{message}</p> : null} */}
  //                     </div>
  //                 </form>
  //             </div>
  //         </div>
  //   )
  // }

  return (
    <div className={style.popupContainer} onClick={props.handleClose}>
      <div className={style.container} onClick={(e) => e.stopPropagation()}>
        <div className={style.header} style={{ backgroundColor: priorityColors[priority] }}>{description}</div>
        <form onSubmit={createTask}>
          <div className={style.form} style={{ backgroundColor: 'darkgray' }}>
            <div className={style.title}>
              <div className={`${style.description} ${style.field}`}>
                <input
                  type='text'
                  size='42'
                  placeholder="n e w  t a s k"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className={style.dateDue}>
              <div className={style.fieldLabel}>D U E:</div>
              <div className={style.field}>
                <input
                  type='date'
                  value={dateDue}
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
                <div/>
                <button type="submit">create task</button>
                <div/>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// Prop types for Component
CreateTask.propTypes = {
  handleClose: PropTypes.func
}

// Default Props for our Component
// Agenda.defaultProps = {
//   handleClose: function () { }
// }

export default CreateTask
