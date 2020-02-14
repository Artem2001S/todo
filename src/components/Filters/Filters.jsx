import React from 'react';
import classes from './Filters.module.scss';
import FilterButton from 'containers/FilterButton';

export default function Filters() {
  const buttons = [
    { name: 'all', content: 'All' },
    { name: 'active', content: 'Active' },
    { name: 'completed', content: 'Completed' }
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
