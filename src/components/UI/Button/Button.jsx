import React from 'react'
import classes from './Button.module.scss'

export default function Button({ onClick, children, isActive }) {
  const clazz = [classes.Button];
  if (isActive) clazz.push(classes.Active);

  return (
    <button className={clazz.join(' ')} onClick={onClick}>
      {children}
    </button>
  )
}
