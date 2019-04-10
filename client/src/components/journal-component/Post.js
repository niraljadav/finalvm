import React from 'react'
import { Link } from "react-router-dom"
import moment from "moment"

export default function Post(props) {
  return (
    <div className="post m-4 p-4">
        <Link to={"/journal/view/" + props.id} className="row justify-content-center h2">{props.title}</Link>
      <span className="row justify-content-center text-muted">{moment(props.date).format("Do MMMM YYYY")}</span>

      <p className="m-2">
        {props.content}
      </p>
    </div>
  )
}