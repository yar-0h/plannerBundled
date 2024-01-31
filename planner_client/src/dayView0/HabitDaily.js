import React, { useState } from 'react'
import PropTypes from 'prop-types'
import style from './css/HabitDaily.module.css'
import Habit from './Habit'
import CreateHabit from './CreateHabit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'

const HabitDaily = (props) => {
  const [newHabitOpen, setNewHabitOpen] = useState(false)

  const toggleCreateHabit = () => {
    setNewHabitOpen(!newHabitOpen)
  }

  const record = (id) => {
    return props.habitRecords.filter(x => (x.id === id))
  }

  return (
    <div className={style.container}>
      {newHabitOpen && <CreateHabit handleClose={toggleCreateHabit}/>}

      <div className={style.habitContainer}>
        <div className={style.habitHeader}>
        </div>
        <div className={style.habitMain}>
          {/* {console.log(props.habits)} */}
          {/* <table style={{width:'100%'}}> removed style while troubleshooting, maybe extraneous? */}
          <table>
            <thead className={style.habitHead}>
              <tr>
                <td>
              HABITS
              </td>
              </tr>
            </thead>

            <tbody>
              {props.habits &&
                props.habits.map((e) => {
                  // console.log(e)
                  return (
                      <tr key={e.id}>
                        <Habit
                          id={e.id}
                          desc={e.description}
                          dateCreated={e.dateCreated}
                          period={e.period}
                          freq={e.frequency}
                          record={record(e.id)}
                        />
                      </tr>
                  )
                })
              }
              {!props.habits &&
                <tr>
                  <td> no habits loaded </td>
                </tr>
              }
            </tbody>
          </table>
            <FontAwesomeIcon onClick={toggleCreateHabit} icon={faSquarePlus} />
        </div>
      </div>
    </div>
  )            
}

{/* <FontAwesomeIcon icon="fa-solid fa-square-xmark" /> */}
{/* <FontAwesomeIcon icon="fa-solid fa-square-check" /> */}
{/* <FontAwesomeIcon icon="fa-regular fa-square" /> */}
{/* <FontAwesomeIcon icon="fa-solid fa-fire" /> */}

// Prop types for Component
HabitDaily.propTypes = {
  habits: PropTypes.array,
  habitRecords: PropTypes.array
}

// Default Props for our Component
// Agenda.defaultProps = {
//   handleClose: function () { }
// }

export default HabitDaily
