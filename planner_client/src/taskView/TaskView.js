import React, { Component } from 'react'
import style from './css/TaskView.module.css'

export default class TaskView extends Component {
  render () {
    return (
      <div>
        <div className={style.outerContainer} >
          <div className={style.innerContainer} >
            <div className={style.incomplete} />
            <div className={style.complete}/>
          </div>
          <div className={style.infoboxbottom} />
        </div>
      </div>
    )
  }
}
