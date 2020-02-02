import React from 'react'
import classes from './AddForm.module.scss'

export default function AddForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={classes.AddForm}>
      <div>
        <input className={classes.Input} type="text" placeholder="What needs to be done ?" />
      </div>
    </form>
  )
}
