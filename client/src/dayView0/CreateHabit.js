import React, { useState } from 'react'
import style from './css/CreateHabit.module.css'
import Axios from 'axios'
import utility from '../Utilities'

import { useQueryClient, useMutation } from 'react-query'
import PropTypes from 'prop-types'

const CreateHabit = (props) => {
  const [description, setDescription] = useState('')
  const [frequency, setFrequency] = useState('')
  const [period, setPeriod] = useState('')
  // const [message, setMessage] = useState("");
  const dateCreated = utility.getCurrentDateTime()

  const useAddHabit = () => {
    const queryClient = useQueryClient()
    return useMutation(addHabit, {
      onSuccess: (data) => {
        // console.log(data)
        // queryClient.invalidateQueries('habits');
        queryClient.setQueryData('habits', (oldQueryData) => {
          return {
            ...oldQueryData,
            data: [...oldQueryData.data, ...data.data]
          }
        })
      }
    })
  }

  const addHabit = async (habit) => {
    return Axios.post('http://localhost:8080/habits', habit)
  }

  const { mutate } = useAddHabit()

  const createHabit = async (e) => {
    e.preventDefault()

    const habit = { description, dateCreated, frequency, period }
    mutate(habit)
  }

  return (
        <div className={style.popupContainer}>
            <div className={style.container}>
                <button className={style.btnClose} onClick={props.handleClose}>X</button>
                <form onSubmit={createHabit}>
                    <input
                        type='text'
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type='number'
                        value={frequency}
                        placeholder="Frequency"
                        onChange={(e) => setFrequency(e.target.value)}
                    />
                    <input
                        type='number'
                        value={period}
                        placeholder="Period"
                        onChange={(e) => setPeriod(e.target.value)}
                    />
                    <button type="submit">Create</button>
                    <div className="message">
                        {/* {message ? <p>{message}</p> : null} */}
                    </div>
                </form>
            </div>
        </div>
  )
}

// Prop types for Component
CreateHabit.propTypes = {
  handleClose: PropTypes.func
}

// Default Props for our Component
CreateHabit.defaultProps = {
  handleClose: function () { }
}

export default CreateHabit
