import React, { Component } from 'react'
import CalendarView from "./CalendarView"
import TodoList from "./todo-component/TodoList"
import TodoHeader from "./todo-component/TodoHeader"

class Calendar extends Component {
  render() {
    return (
      <div className="row dashboard">
        <div className="calendar col-md-9" style={{ height: "600px" }}>
          <CalendarView />
        </div>
        <div className="todo col-md-3">
          <TodoHeader />
          <TodoList />
        </div>
      </div>
    )
  }
}


export default Calendar
