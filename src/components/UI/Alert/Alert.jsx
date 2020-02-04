import React from 'react'
import classes from './Alert.module.scss'

export default class Alert extends React.Component {
  constructor() {
    super();
    this.alertRef = React.createRef();
  }

  render() {
    return (
      <div ref={this.alertRef} className={classes.Alert} >
        {this.props.children}
      </div>
    )
  }

  componentDidMount() {
    setTimeout(() => {
      this.alertRef.current.className += ' ' + classes.AlertAnimated;
    }, 0);
  }
}
