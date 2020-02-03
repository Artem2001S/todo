import React, { useState } from 'react'
import classes from './AddForm.module.scss'

export default function AddForm({ sumbitHandler, onToggleAll }) {
  const [value, setValue] = useState('');

  return (
    <form className={classes.AddForm} onSubmit={
      (e) => {
        e.preventDefault();
        sumbitHandler.call(this, value.trim());
        setValue('');
      }
    } >
      <div>
        <div onClick={onToggleAll} className={classes.ToggleAllBtn + ' ' + classes.Active}>
          ❯
        </div>
        <input
          className={classes.Input}
          type="text"
          placeholder="What needs to be done ?"
          value={value}
          onChange={(e) => { setValue(e.target.value); }}
        />
      </div>
    </form>
  )
}
