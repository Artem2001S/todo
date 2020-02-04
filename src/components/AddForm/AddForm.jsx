import React, { useState } from 'react'
import classes from './AddForm.module.scss'
import Alert from '../UI/Alert/Alert';

export default function AddForm({ sumbitHandler, onToggleAll, isToggleBtnActive, isEmpty }) {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const toggleAllBtnClasses = [classes.ToggleAllBtn];
  if (isToggleBtnActive) { toggleAllBtnClasses.push(classes.Active) }

  return (
    <form className={classes.AddForm} onSubmit={
      (e) => {
        e.preventDefault();
        if (value === '') {
          setErrorMessage(true);
          return;
        }

        sumbitHandler.call(this, value.trim());
        setValue('');
        setErrorMessage(false);
      }
    } >

      {errorMessage ? <Alert>Enter data!</Alert> : null}
      <div>
        {
          isEmpty ?
            null :
            <div onClick={onToggleAll} className={toggleAllBtnClasses.join(' ')}>
              ❯
           </div>
        }

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
