// svg dial code adapted from tutorial at

import { AgendaBrief } from '../dayView0/AgendaBrief'
import React from 'react'
import PropTypes from 'prop-types'

// https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/
export const AgendaScroll = (props) => {
  // const elRef = useRef();

  const returnButton = () => {
    if (props.currentDay === null) {
      return []
    } else if (new Date(props.currentDay) < new Date()) {
      return (
                <svg>
                    <rect x={0} y={'100%'} width={'100%'} height={'-30px'} style={{ fill: 'blue', fillOpacity: '0.7' }} />\
                </svg>
      )
    } else if (new Date(props.currentDay) > new Date()) {
      return (
                <svg>
                    <rect x={0} y={0} width={'100%'} height={'30px'} style={{ fill: 'blue', fillOpacity: '0.7' }} />\
                </svg>
      )
    } else {
      return []
    }
  }

  let agendabrief = <div></div>
  if (props.events) {
    agendabrief =
            <AgendaBrief
                events = {props.daysEvents}
                currentDay = {props.currentDay}
            />
  }

  return (
        <svg width='100%' height='100%'>
            {returnButton()}
            {agendabrief}

        </svg>
  )
}

// Prop types for Component
AgendaScroll.propTypes = {
  events: PropTypes.object,
  daysEvents: PropTypes.object,
  currentDay: PropTypes.object
}

// Default Props for our Component
// Agenda.defaultProps = {
//   handleClose: function () { }
// }
