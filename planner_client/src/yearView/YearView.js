import React, { Component } from 'react'
// import DailyChecks from './DailyChecks'
// import Agenda from './dayView0/Agenda'
// import style from './css/YearView.module.css'

import { Checkbox } from '../dayView0/Checkbox'

function tc () {
  return 5
}

export default class YearView extends Component {
  render () {
    return (
      <div>
        {Checkbox(tc, tc)}
        {/* <div className={style.outerContainer} >
          <div className={style.innerContainer} >
            <div className={style.infoboxside} />
            <div className={style.yearbox}>
              <div className={style.monthbox} />
              <div className={style.monthbox} />
              <div className={style.monthbox} />
              <div className={style.monthbox} />

              <div className={style.monthbox} />
              <div className={style.monthbox} />
              <div className={style.monthbox} />
              <div className={style.monthbox} />

              <div className={style.monthbox} />
              <div className={style.monthbox} />
              <div className={style.monthbox} />
              <div className={style.monthbox} />

              <div className={style.monthbox} />
              <div className={style.monthbox} />
              <div className={style.monthbox} />
              <div className={style.monthbox} />
            </div>
          </div>
          <div className={style.infoboxbottom} />
        </div> */}

      </div>
    )
  }
}
