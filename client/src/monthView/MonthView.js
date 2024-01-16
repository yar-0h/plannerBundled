import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import DailyChecks from './DailyChecks'
// import Agenda from './dayView0/Agenda'
import style from './css/MonthView.module.css'

// import { getDayPreview } from './dayView0/AgendaBrief'

export default class MonthView extends Component {
  render () {
    // console.log(new Date(this.props.events.data[0].startTime).getMonth())
    // console.log(new Date(this.props.events.data[0].startTime).getDate())

    let daysEvents = []
    if (this.props.events) {
      daysEvents = this.props.events.data.filter(x =>
        (new Date(x.startTime).getMonth() + 1 === 5 &&
          new Date(x.startTime).getDate() === 1)
      )
    }
    console.log(daysEvents)
    return (
      <div>
        <div className={style.outerContainer} >
          <div className={style.innerContainer} >
            <div className={style.infoboxside} />
            <div className={style.calendarbox}>
              <div className={style.monthlabel}>
                <div className={style.daylabel} />
                <div className={style.daylabel} />
                <div className={style.daylabel} />
                <div className={style.daylabel} />
                <div className={style.daylabel} />
                <div className={style.daylabel} />
                <div className={style.daylabel} />
              </div>
              <div className={style.monthbox}>
                <div className={style.daybox}>
                  {/* {getDayPreview(daysEvents)} */}
                </div>
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />

                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />

                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />

                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />

                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />

                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
                <div className={style.daybox} />
              </div>
            </div>
          </div>
          <div className={style.infoboxbottom} />
        </div>
      </div>
    )
  }
}

// Prop types for Component
MonthView.propTypes = {
  events: PropTypes.object
}

// Default Props for our Component
// Agenda.defaultProps = {
//   handleClose: function () { }
// }
