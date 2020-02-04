import React from 'react';
import classes from './StatusBar.module.scss';

export default function StatusBar({ statusText }) {
  return (
    <div>
      <div className={classes.StatusLine}>
        {statusText}
      </div>
    </div>
  )
}
