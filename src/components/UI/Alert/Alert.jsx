import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Alert.scss';

export default function Alert(props) {
  return (
    <ReactCSSTransitionGroup transitionName="to-right" transitionAppear={true}>
      <div className={'Alert'}>{props.children}</div>
    </ReactCSSTransitionGroup>
  );
}
