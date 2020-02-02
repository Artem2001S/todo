import React, { Component } from 'react'
import classes from './Todo.module.css'
import Header from '../../components/Header/Header'
import AddForm from '../../components/AddForm/AddForm'

export default class Todo extends Component {
  render() {
    return (
      <div className={classes.TodoContainer}>
        <Header headerContent={'To do list'} />
        <AddForm />
      </div>
    )
  }
}
