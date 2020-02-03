import React from 'react'
import classes from './ProgressIndicator.module.scss'

export default function ProgressIndicator({ progressValue }) {
  return (
    <div className={classes.ProgressIndicator}>
      <span className={classes.ProgressValue}>{progressValue}%</span>
      <div className={classes.ProgressGraphic}>
        <div className={classes.ProgressDone} style={{ width: `${progressValue}%` }}></div>
      </div>
    </div>
  )
}
