import React from 'react';
import classes from './Filters.module.scss';
import FilterButton from 'containers/FilterButton';

export default function Filters() {
  const buttons = [
    { name: 'all', content: 'Все' },
    { name: 'active', content: 'Активные' },
    { name: 'completed', content: 'Выполненные' }
  ];

  return (
    <div className={classes.Filters}>
      {buttons.map(btn => {
        return (
          <FilterButton key={btn.name} filter={btn.name}>
            {btn.content}
          </FilterButton>
        );
      })}
    </div>
  );
}
