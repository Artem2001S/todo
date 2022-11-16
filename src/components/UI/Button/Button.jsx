import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './Button.module.scss';

export default function Button({
  onClick,
  children,
  className,
  isActive,
  type
}) {
  const btnClasses = classNames(
    classes.Button,
    {
      [classes.Transparent]: type === 'transparent',
      [classes.Active]: isActive
    },
    className
  );

  return (
    <button className={btnClasses} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  type: PropTypes.string
};
