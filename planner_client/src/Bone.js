import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DailyChecks from './dayView0/DailyChecks'
// import Agenda from './Agenda';
import style from './css/Bone.module.css'

export default class Bone extends Component {
  render () {
    return (
      <div>
        <div className={style.container} >
            <DailyChecks
              tasks={this.props.tasks}
              habits={this.props.habits}
            />
            {/* <Agenda
              handPosition= {this.props.handPosition}
              events={this.props.events}
            /> */}
            <div className={style.foot} />
        </div>
      </div>
    )
  }
}

// Prop types for Component
Bone.propTypes = {
  tasks: PropTypes.array.isRequired,
  habits: PropTypes.array.isRequired
}

// Default Props for our Component
Bone.defaultProps = {
  tasks: [],
  habits: []
}
