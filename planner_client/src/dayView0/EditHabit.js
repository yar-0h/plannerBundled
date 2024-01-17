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
          const habitIdToUpdate = data.data[0].id // the ID of the habit to update

          const updatedHabits = oldQueryData.data.map((habit) => {
            if (habit.id === habitIdToUpdate) {
              // create a new object for the updated habit
              return data.data[0]
            }
            return habit
          })

          return {
            ...oldQueryData,
            data: updatedHabits
          }
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
          return {
            ...oldQueryData,
            data: [...oldQueryData.data.filter((habit) => habit.id !== props.id)]
          }
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
    // e.preventDefault();
    deleteSubmit()
  }

  return (
        <div className={style.popupContainer}>
            <div className={style.container}>
                <button className={style.btnClose} onClick={props.handleClose}>X</button>
                <form onSubmit={editHabit}>
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
                    <button type="submit">Update Habit</button>
                    <button type="button" onClick={deleteHabit}>Delete Habit</button>

                    <div className="message">
                        {/* {message ? <p>{message}</p> : null} */}
                    </div>
                </form>
            </div>
        </div>
  )
}

// Prop types for Component
EditHabit.propTypes = {
  id: PropTypes.string,
  period: PropTypes.string,
  freq: PropTypes.string,
  desc: PropTypes.string,
  handleClose: PropTypes.func
}

// Default Props for our Component
// Agenda.defaultProps = {
//   handleClose: function () { }
// }

export default EditHabit
