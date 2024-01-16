import React, { Component } from 'react'
import style from './css/WeekView.module.css'
// import { getBG } from './dayView0/AgendaDetail'

export default class WeekView extends Component {
  render () {
    return (
      <div>
        <div className={style.outerContainer} >
          <div className={style.innerContainer} >
            <div className={style.infoboxside} />
            <div className={style.weekbox}>
              <div className={style.daybox}>
                <div className={style.dayTitle} />
                <div className={style.dayContent} />
              </div>
              <div className={style.daybox}>
                <div className={style.dayTitle} />
                <div className={style.dayContent} />
              </div>
              <div className={style.daybox}>
                <div className={style.dayTitle} />
                <div className={style.dayContent} />
              </div>
              <div className={style.daybox}>
                <div className={style.dayTitle} />
                <div className={style.dayContent} />
              </div>
              <div className={style.daybox}>
                <div className={style.dayTitle} />
                <div className={style.dayContent} />
              </div>
              <div className={style.daybox}>
                <div className={style.dayTitle} />
                <div className={style.dayContent} />
              </div>
              <div className={style.daybox}>
                <div className={style.dayTitle} />
                <div className={style.dayContent} />
              </div>
            </div>
          </div>
          <div className={style.infoboxbottom}>
            <div className={style.taskPanel} />
            <div className={style.habitPanel} />
          </div>
        </div>
      </div>
    )
  }
}

// export default class WeekView extends Component {
//   render() {
//     return (
//       <div>
//         <div className={style.outerContainer} style={{overflow:"scroll"}}>
//           {/* {getBG(this.props.events)} */}
//         </div>
//       </div>
//     );
//   }
// }
