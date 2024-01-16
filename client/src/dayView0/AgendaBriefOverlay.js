// svg dial code adapted from tutorial at
import Utilities from '../Utilities'
import React from 'react'
import PropTypes from 'prop-types'
import style from './css/AgendaBriefOverlay.module.css'

// https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/
export const AgendaBriefOverlay = (props) => {
  // const dayColor = ["#2e4045", "#83adb5", "#c7bbc9", "#5e3c58", "#bfb5b2", "#c8c8c8"]

  const dateLabel = () => {
    return (
            <svg>
                <text x={-350} y={25} transform="rotate(270)" style={{ fill: 'rgb(190,190,190)' }}>{String(props.selectedDay).slice(0, 15)}</text>
            </svg>
    )
  }

  const currentScrollBox = () => {
    return (
      <svg>
          <rect x={0} y={(((props.scrollboxY) / 1440 * 74)) + '%'} width={'100%'} height={props.scrollboxSize / 1440 * 66 + '%'} style={{ fill: 'burgundy', fillOpacity: '0.2' }}/>
      </svg>
    )
  }

  const yesterdayButton = () => {
    return (
            <svg className={style.yesterdayButton}>
                <rect x={0} y={0} width={'100%'} height={'6%'} style={{ fill: 'grey', fillOpacity: '0.4' }} onClick={props.yesterdayButton}/>
                <text x={9} y={15} style={{ fill: 'rgb(190,190,190)', pointerEvents: 'none', transition: 'opacity 1s' }}>▲</text>
            </svg>
    )
  }

  const tomorrowButton = () => {
    return (
            <svg className={style.tomorrowButton}>
                <rect x={0} y={'94%'} width={'100%'} height={'6%'} style={{ fill: 'grey', fillOpacity: '0.4' }} onClick={props.tomorrowButton} />
                <text x={9} y={'99%'} style={{ fill: 'rgb(190,190,190)', pointerEvents: 'none' }}>▼</text>
            </svg>
    )
  }

  const returnButton = () => {
    const currentDay = new Date()
    currentDay.setHours(0, 0, 0, 0)

    if (Utilities.formatDate(props.selectedDay) === Utilities.getCurrentDate()) {
      return (<div/>)
    } else if (((new Date(props.selectedDay) - (new Date()).setHours(-24, 0, 0, 0)) / 60000 > 1440)) {
      return (
                <svg className={style.returnButton}>
                    <rect x={0} y={0} width={'100%'} height={'3%'} style={{ fill: 'black', fillOpacity: '0.7' }} onClick={props.todayButton}/>
                    <text x={9} y={15} style={{ fill: 'rgb(190,190,190)', pointerEvents: 'none', transition: 'opacity 1s' }}>▲</text>
                </svg>
      )
    } else if (((new Date(props.selectedDay) - (new Date()).setHours(24, 0, 0, 0)) / 60000 < -1440)) {
      return (
                <svg className={style.returnButton}>
                    <rect x={0} y={'97%'} width={'100%'} height={'3%'} style={{ fill: 'black', fillOpacity: '0.7' }} onClick={props.todayButton} />
                    <text x={9} y={'99%'} style={{ fill: 'rgb(190,190,190)', pointerEvents: 'none' }}>▼</text>
                </svg>
      )
    } else {
      return (<div/>)
    }
  }

  return (
        <svg width='100%' height='100%'>
            {currentScrollBox()}
            {yesterdayButton()}
            {dateLabel()}
            {tomorrowButton()}
            {returnButton()}
        </svg>
  )
}

// Prop types for Component
AgendaBriefOverlay.propTypes = {
  tomorrowButton: PropTypes.func,
  todayButton: PropTypes.func,
  yesterdayButton: PropTypes.func,
  selectedDay: PropTypes.object,
  scrollboxY: PropTypes.number,
  scrollboxSize: PropTypes.number
}
