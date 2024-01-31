import Axios from 'axios'
import React, { useState } from 'react'
import style from './css/CreateEvent.module.css'
import Utilities from '../Utilities'

import Circle from '@uiw/react-color-circle'

import { useQueryClient, useMutation } from 'react-query'
import PropTypes from 'prop-types'

const CreateEvent = (props) => {
  const catColors = ['#e06c75', '#e5c07b', '#56b6c2', '#61afef', '#c678dd', '#abb2bf', '#282c34']

  const [description, setDescription] = useState('')
  const [start, setStart] = useState(Utilities.formatDateTime(props.eventStart))
  const [end, setEnd] = useState(Utilities.formatDateTime(Utilities.addMinutes(new Date(start), 30)))
  const [notes, setNotes] = useState('')
  const [category, setCategory] = useState(0)
  const [minuteDiff, setMinuteDiff] = useState(30)
  const [message, setMessage] = useState('')


  const useAddEvent = () => {
    const queryClient = useQueryClient()
    return useMutation(addEvent, {
      onSuccess: (data) => {
        // queryClient.invalidateQueries('tasks');
        queryClient.setQueryData('events', (oldQueryData) => {
          // console.log(newEvent)

          const testobj = [...oldQueryData, data.data]
          console.log(testobj)
          return [...oldQueryData, data.data]
        })
      }
    })
  }

  const addEvent = async (event) => {
    return Axios.post('http://localhost:8080/events', event)
  }

  const { mutate } = useAddEvent()

  const createEvent = async (e) => {
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

      mutate(event)
      props.handleClose()
    }
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
        <form onSubmit={createEvent}>
          <div className={style.form} style={{ backgroundColor: catColors[category] + '2b' }}>
            <div className={style.title}>
              <div style={{ backgroundColor: catColors[category] + '2b' }}
                className={`${style.eventLength} ${style.fieldLabel}`} >
                  {(isNaN(Math.floor(minuteDiff / 60)) ? '--' : Math.floor(minuteDiff / 60)).toString().padStart(2, 0) + 'h '}
                  {(isNaN(Math.floor(minuteDiff % 60)) ? '--' : Math.floor(minuteDiff % 60)).toString().padStart(2, 0) + 'h'}
              </div>
              <div className={`${style.description} ${style.field}`}>
                <input
                  type='text'
                  size='23'
                  value={description}
                  placeholder="description"
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
              <div/>
              <button type="submit">create event</button>
              <div/>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// Prop types for Component
CreateEvent.propTypes = {
  eventStart: PropTypes.object,
  handleClose: PropTypes.func
}

// Default Props for our Component
// CreateEvent.defaultProps = {
//   eventStart: function () { }
// }

export default CreateEvent
