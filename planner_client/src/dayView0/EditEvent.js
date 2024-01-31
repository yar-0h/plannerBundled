import React, { useState } from 'react'
import Axios from 'axios'
import style from './css/EditEvent.module.css'
import Utilities from '../Utilities'

import Circle from '@uiw/react-color-circle'

import { useQueryClient, useMutation } from 'react-query'
import PropTypes from 'prop-types'

const EditEvent = (props) => {
  const catColors = ['#e06c75', '#e5c07b', '#56b6c2', '#61afef', '#c678dd', '#abb2bf', '#282c34']

  const [description, setDescription] = useState(props.description)
  const [start, setStart] = useState(Utilities.formatDateTime(props.startTime))
  const [end, setEnd] = useState(Utilities.formatDateTime(props.endTime))
  const [notes, setNotes] = useState(props.notes)
  const [category, setCategory] = useState(props.category)
  const [minuteDiff, setMinuteDiff] = useState(Utilities.getMinuteDifference(props.startTime, props.endTime))
  const [message, setMessage] = useState('')

  const useUpdateEvent = () => {
    const queryClient = useQueryClient()
    return useMutation(updateEvent, {
      onSuccess: (data) => {
        // queryClient.invalidateQueries('events');
        queryClient.setQueryData('events', (oldQueryData) => {
          const eventIdToUpdate = data.data.id // the ID of the event to update

          const updatedEvents = oldQueryData.map((event) => {
            if (event.id === eventIdToUpdate) {
              // create a new object for the updated event
              return data.data
            }
            return event
          })

          return updatedEvents
        })
      }
    })
  }

  const updateEvent = async (event) => {
    return Axios.put(
      `http://localhost:8080/events/${props.id}`, event
    )
  }

  const { mutate: updateSubmit } = useUpdateEvent()

  const editEvent = async (e) => {
    e.preventDefault()
    if (description.length < 1) {
      setMessage('missing event description')
    } else if (end < start) {
      setMessage('invalid start time')
    } else {
      const event = {
        description,
        startTime: Utilities.dtlToMysql(start),
        endTime: Utilities.dtlToMysql(end),
        notes,
        category
      }

      updateSubmit(event)
      props.handleClose()
    }
  }

  const useRemoveEvent = () => {
    const queryClient = useQueryClient()
    return useMutation(removeEvent, {
      onSuccess: () => {
        // queryClient.invalidateQueries('events');
        queryClient.setQueryData('events', (oldQueryData) => {
          return oldQueryData.filter((event) => event.id !== props.id)
        })
      }
    })
  }

  const removeEvent = async () => {
    return Axios.delete(
      `http://localhost:8080/events/${props.id}`
    )
  }

  const { mutate: deleteSubmit } = useRemoveEvent()

  const deleteEvent = async (e) => {
    e.preventDefault()
    deleteSubmit()
    props.handleClose()
  }

  const handleSetStart = (start) => {
    setStart(start)
    setMinuteDiff(Utilities.getMinuteDifference(start, end))
  }
  const handleSetEnd = (end) => {
    setEnd(end)
    setMinuteDiff(Utilities.getMinuteDifference(start, end))
  }

  return (
    <div className={style.popupContainer} onClick={props.handleClose}>
        <div className={style.container} onClick={(e) => e.stopPropagation()}>
          <div className={style.header} style={{ backgroundColor: catColors[category], color: catColors[category] === '#282c34' ? 'white' : 'black' }}>{description}</div>
          <form onSubmit={editEvent}>
            <div className={style.form} style={{ backgroundColor: catColors[category] + '2b' }}>
              <div className={style.title}>
                <div style={{ backgroundColor: catColors[category] + '3b' }}
                  className={`${style.eventLength} ${style.fieldLabel}`} >
                    {(isNaN(Math.floor(minuteDiff / 60)) ? '--' : Math.floor(minuteDiff / 60)).toString().padStart(2, 0) + 'h '}
                    {(isNaN(Math.floor(minuteDiff % 60)) ? '--' : Math.floor(minuteDiff % 60)).toString().padStart(2, 0) + 'h'}
                </div>
                <div className={`${style.description} ${style.field}`}>
                  <input
                    type='text'
                    size='23'
                    value={description}
                    placeholder={props.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className={style.from}>
                <div className={style.fieldLabel}>F R O M:</div>
                <div className={style.field}>
                  <input
                    type='datetime-local'
                    value={start}
                    onChange={(e) => handleSetStart(e.target.value)}
                  />
                </div>
              </div>
              <div className={style.to}>
                <div className={style.fieldLabel}>U N T I L:</div>
                <div className={style.field}>
                  <input
                    type='datetime-local'
                    value={end}
                    onChange={(e) => handleSetEnd(e.target.value)}
                  />
                </div>
              </div>
              <div className={style.notes}>
                <div className={style.noteLabel}>N O T E S:</div>
                <textarea
                  style={{ resize: 'none', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                  name="notefield"
                  rows={4}
                  cols={42}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>
              <div className={style.category}>
                <Circle
                  colors={['#E06C75', '#E5C07B', '#56B6C2', '#61AFEF', '#C678DD', '#ABB2BF', '#282C34']}
                  color={catColors[category]}
                  onChange={(color) => {
                    setCategory(catColors.indexOf(color.hex))
                  }}
                />
              </div>
              <div className={style.notice}>
                  {<p>{message}</p>}
              </div>
              <div className={style.buttons}>
                <button type="submit">update</button>
                <div/>
                <button type="button" onClick={deleteEvent}>delete</button>
              </div>
            </div>
          </form>
        </div>
    </div>
  )
}

// Prop types for Component
EditEvent.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  notes: PropTypes.string,
  category: PropTypes.number,
  handleClose: PropTypes.func
}

// Default Props for our Component
EditEvent.defaultProps = {
  notes: ''
}

export default EditEvent
