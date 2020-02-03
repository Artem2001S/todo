import React from 'react'
import classes from './Button.module.scss'

export default function Button({ onClick, children, isActive, type }) {
  const clazz = [classes.Button];
  if (isActive) clazz.push(classes.Active);
  if (type === 'transparent') clazz.push(classes.Transparent);

  return (
    <button className={clazz.join(' ')} onClick={onClick}>
      {children}
    </button>
  )
}
