import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.scss';

export default function Button({ onClick, children, isActive, type }) {
  const clazz = [classes.Button];
  if (isActive) clazz.push(classes.Active);
  if (type === 'transparent') clazz.push(classes.Transparent);

  return (
    <button className={clazz.join(' ')} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  type: PropTypes.string
};
