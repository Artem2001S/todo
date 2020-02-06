import React from 'react';
import PropTypes from 'prop-types';
import classes from './StatusBar.module.scss';

export default function StatusBar({ statusText }) {
  return (
    <div>
      <div className={classes.StatusLine}>
        {statusText}
      </div>
    </div>
  )
}

StatusBar.propTypes = {
  statusText: PropTypes.string.isRequired
}
