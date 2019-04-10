import React from 'react'
import { Link } from "react-router-dom"
import moment from "moment"

export default function Event(props) {
  if (props.year === moment(props.start).format("YYYY")
    && props.month === moment(props.start).format("MM")) {
    return (
      <div className="row timeline m-4 p-4">
        <div className="col">
          <span className="timeline-day p-2">
          {moment(props.start).format("DD")}
          </span>
          <span>
          {moment(props.start).format("dddd")}
          </span>
        </div>

        {props.allDay
          ?<div className="col">
          All Day
        </div>
        :<div className="col">
        {moment(props.start).format("h:mm a")}
      </div>}

        <div className="col">
          <Link to={"/calendar/view/" + props.id} className="h2">{props.title}</Link>
        </div>
      </div>
    )
  }
  return null
}