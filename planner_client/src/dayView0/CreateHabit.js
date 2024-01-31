import React, { useState } from 'react'
import style from './css/CreateHabit.module.css'
import Axios from 'axios'
import utility from '../Utilities'

import { useQueryClient, useMutation } from 'react-query'
import PropTypes from 'prop-types'

const CreateHabit = (props) => {
  const [description, setDescription] = useState('n e w h a b i t')
  const [frequency, setFrequency] = useState(0)
  const [period, setPeriod] = useState(1)
  // const [message, setMessage] = useState("");
  const dateCreated = utility.getCurrentDateTime()

  const useAddHabit = () => {
    const queryClient = useQueryClient()
    return useMutation(addHabit, {
      onSuccess: (data) => {
        // queryClient.invalidateQueries('habits');
        queryClient.setQueryData('habits', (oldQueryData) => {
          return [ ...oldQueryData, data.data]
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
    props.handleClose()

  }

  return (
    <div className={style.popupContainer} onClick={props.handleClose}>
      <div className={style.container} onClick={(e) => e.stopPropagation()}>
        <div className={style.header} style={{ backgroundColor: 'grey' }}>{description}</div>
        <form onSubmit={createHabit}>
          <div className={style.form} style={{ backgroundColor: 'darkgray' }}>
            <div className={style.title}>
              <div className={`${style.description} ${style.field}`}>
                <input
                  type='text'
                  size='42'
                  placeholder="n e w  h a b i t"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            {/* <div className={style.dateDue}>
              <div className={style.fieldLabel}>FREQUENCY:</div>
              <div className={style.field}>
                <input
                  type='number'
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                />
              </div>
            </div> */}
            <div className={style.periodGroup}>
              <div className={`${style.periodLeft} ${style.fieldLabel}`}>EVERY</div>
              <div className={style.field}>
                <input
                  className={style.periodField}
                  type='text'
                  inputMode='numeric'
                  pattern="[1-9]*"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                />
              </div>
              <div className={`${style.periodRight} ${style.fieldLabel}`}>DAYS</div>
            </div>
            {/* <div className={style.priority}>
              <div className={style.fieldLabel}>P R I O R I T Y:</div>
              <Circle
                className={style.field}
                colors={priorityColors}
                color={priorityColors[priority]}
                onChange={(color) => {
                  setPriority(priorityColors.indexOf(color.hex))
                }}
              />
            </div> */}
            <div>
              <div className={style.notice}>
                {<p>{}</p>}
              </div>
              <div className={style.buttons}>
                <div/>
                <button type="submit">create habit</button>
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
CreateHabit.propTypes = {
  handleClose: PropTypes.func
}

// Default Props for our Component
CreateHabit.defaultProps = {
  handleClose: function () { }
}

export default CreateHabit
