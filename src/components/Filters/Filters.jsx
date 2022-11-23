import React from 'react';
import classes from './Filters.module.scss';
import FilterButton from 'containers/FilterButton';
import { useSelector } from 'react-redux';

export default function Filters() {
  const current = useSelector(state => state.filter.filterType);

  const buttons = [
    { name: 'all', content: 'Все' },
    { name: 'active', content: 'Активные' },
    { name: 'completed', content: 'Выполненные' }
  ];

  return (
    <div className={classes.Filters}>
      {buttons.map(btn => {
        return (
          <FilterButton
            key={btn.name}
            isActive={current === btn.name}
            filter={btn.name}
          >
            {btn.content}
          </FilterButton>
        );
      })}
    </div>
  );
}
