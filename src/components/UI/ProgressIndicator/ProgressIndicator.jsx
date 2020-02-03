import React from 'react'
import classes from './ProgressIndicator.module.scss'

export default function ProgressIndicator() {
  return (
    <div className={classes.ProgressIndicator}>
      <span className={classes.ProgressValue}>22%</span>
      <div className={classes.ProgressGraphic}>
        <div className={classes.ProgressDone} style={{width: '20%'}}></div>
      </div>
    </div>
  )
}
