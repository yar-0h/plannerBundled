// adapted from https://codepen.io/dhavidyluiz/pen/OraKRM
import style from './css/Checkbox.module.css'
import React from 'react'

export const Checkbox = (tc, ct) => {
  return (
        <div className={style.svgCheckbox}>
            <input
                type="checkbox"
                name="checkbox-slash"
                checked={Boolean(tc)}
                onChange={ct}/>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={'#485B63'}>
                <rect width="100" height="100" fill={'white'}/>
                <path d="M 10 10 L 90 90" stroke="red" strokeDasharray="113" strokeDashoffset="113"/>
            </svg>
        </div>
  )
}
