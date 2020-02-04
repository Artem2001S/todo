import React from 'react';
import classes from './StatusBar.module.scss';

export default function StatusBar({ statusText }) {
  return (
    <div className={classes.StatusBar}>
      <div className={classes.StatusLine}>
        1 item left
      </div>
    </div>
  )
}
