import React from 'react'
import Button from '../UI/Button/Button'
import classes from './Filters.module.scss'

export default function Filters({ activeFilter, onClickHandler }) {
  const buttons = [
    { name: 'all', content: 'All' },
    { name: 'active', content: 'Active' },
    { name: 'completed', content: 'Completed' }
  ];

  return (
    <div className={classes.Filters}>
      {
        buttons.map((btn) => {
          return <Button key={btn.name}
            isActive={activeFilter === btn.name}
            onClick={onClickHandler.bind(this, btn.name)}
          >
            {btn.content}
          </Button>
        })
      }
    </div>
  )
}
