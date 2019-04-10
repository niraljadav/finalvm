import React from 'react'
import { Link } from "react-router-dom"
import moment from "moment"

export default function Record(props) {
  return (
    <div className="bg-dark text-white m-2 p-2">
      <Link to={"/expense-tracker/view/" + props.record._id}><h2>{props.record.description}</h2></Link>
      <h4 className="text-muted">{moment(props.record.date).format('MMMM Do YYYY, h:mm:ss a')}</h4>
      <p>{props.content}</p>
    </div>
  )
}