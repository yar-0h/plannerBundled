import React, { useState } from 'react'
import Axios from 'axios'
import style from './css/EditHabit.module.css'

import { useQueryClient, useMutation } from 'react-query'
import PropTypes from 'prop-types'

const EditHabit = (props) => {
  const [description, setDescription] = useState(props.desc)
  const [frequency, setFrequency] = useState(props.freq)
  const [period, setPeriod] = useState(props.period)
  // const [message, setMessage] = useState("");
  // const dateCreated = utility.getCurrentDateTime();

  // let handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //         const { status } = await Axios.put(
  //             `http://localhost:8080/habits/${props.id}`, {
  //                 description: description,
  //                 frequency: frequency,
  //                 period: period,
  //             }
  //         );
  //         if (status === 200) {
  //             setDescription(description);
  //             setFrequency(frequency);
  //             setPeriod(period);
  //             setMessage("habit updated successfully");
  //         } else {
  //             setMessage("error encountered")
  //         }
  //     } catch (err) {
  //         console.log(err);
  //     }
  // };

  const useUpdateHabit = () => {
    const queryClient = useQueryClient()
    return useMutation(updateHabit, {
      onSuccess: (data) => {
        // queryClient.invalidateQueries('habits');
        queryClient.setQueryData('habits', (oldQueryData) => {
          const habitIdToUpdate = data.data.id // the ID of the habit to update

          const updatedHabits = oldQueryData.map((habit) => {
            if (habit.id == habitIdToUpdate) {
              // create a new object for the updated habit
              return data.data
            }
            return habit
          })

          return updatedHabits
        })
      }
    })
  }

  const updateHabit = async (habit) => {
    return Axios.put(
            `http://localhost:8080/habits/${props.id}`, habit
    )
  }

  const { mutate: updateSubmit } = useUpdateHabit()

  const editHabit = async (e) => {
    e.preventDefault()
    const habit = {
      description,
      frequency,
      period
    }

    updateSubmit(habit)
    props.handleClose()

  }

  // let handleDelete = async () => {
  //     try {
  //         const { status } = await Axios.delete(
  //             `http://localhost:8080/habits/${props.id}`
  //         );
  //         if (status === 200) {
  //             setMessage("habit deleted successfully");
  //         } else {
  //             setMessage("error encountered")
  //         }
  //     } catch (err) {
  //         console.log(err);
  //     }
  // };

  const useRemoveHabit = () => {
    const queryClient = useQueryClient()
    return useMutation(removeHabit, {
      onSuccess: () => {
        // queryClient.invalidateQueries('habits');
        queryClient.setQueryData('habits', (oldQueryData) => {
          return [...oldQueryData.filter((habit) => habit.id !== props.id)]
        })
      }
    })
  }

  const removeHabit = async () => {
    return Axios.delete(
            `http://localhost:8080/habits/${props.id}`
    )
  }

  const { mutate: deleteSubmit } = useRemoveHabit()

  const deleteHabit = async (e) => {
    e.preventDefault();
    deleteSubmit()
    props.handleClose()
  }

  return (
    <div className={style.popupContainer} onClick={props.handleClose}>
      <div className={style.container} onClick={(e) => e.stopPropagation()}>
        <div className={style.header} style={{ backgroundColor: 'grey' }}>{description}</div>
        <form onSubmit={editHabit}>
          <div className={style.form} style={{ backgroundColor: 'darkgray' }}>
            <div className={style.title}>
              <div className={`${style.description} ${style.field}`}>
                <input
                  type='text'
                  value={description}
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className={style.periodGroup}>
              <div className={`${style.periodLeft} ${style.fieldLabel}`}>EVERY</div>
              <div className={style.field}>
                <input
                  className={style.periodField}
                  type='text'
                  inputMode='numeric'
                  pattern="[1-9]*"
                  value={period}
                  onChange={(e) => setPeriod(Number(e.target.value))}
                />
              </div>
              <div className={`${style.periodRight} ${style.fieldLabel}`}>DAYS</div>
            </div>
            <div>
              <div className={style.notice}>
                {<p>{}</p>}
              </div>
              <div className={style.buttons}>
                  <button type="submit">Update Habit</button>
                  <div/>
                  <button type="button" onClick={deleteHabit}>Delete Habit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// Prop types for Component
EditHabit.propTypes = {
  id: PropTypes.number,
  period: PropTypes.number,
  freq: PropTypes.number,
  desc: PropTypes.string,
  handleClose: PropTypes.func
}

// Default Props for our Component
// Agenda.defaultProps = {
//   handleClose: function () { }
// }

export default EditHabit
