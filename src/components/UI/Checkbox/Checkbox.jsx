import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './Checkbox.module.scss';

export default function Checkbox({ onCheckboxChanged, isChecked, type }) {
  const checkboxClasses = classNames(classes.checkboxToggle, {
    [classes.Active]: isChecked,
    [classes.Pinned]: type === 'pink'
  });

  return (
    <div
      className={checkboxClasses}
      onClick={() => {
        onCheckboxChanged();
      }}
    />
  );
}

Checkbox.propTypes = {
  onCheckboxChanged: PropTypes.func,
  isChecked: PropTypes.bool
};
