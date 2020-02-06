import React from 'react';
import classes from './Header.module.scss';
import PropTypes from 'prop-types';

export default function Header({ headerContent }) {
  return (
    <header>
      <div className={classes.HeaderTitle}>{headerContent}</div>
    </header>
  );
}

Header.propTypes = {
  headerContent: PropTypes.string
};
