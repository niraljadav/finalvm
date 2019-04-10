import React from 'react'
import spinner from "./spinner.gif"

export default function Spinner() {
  return (
    <div className="text-center mt-5">
      <span style={{color: "#351431"}}>
        <i className="fas fa-circle-notch fa-spin fa-3x"></i>
      </span>
      {/* <img 
        src={spinner}
        style={{width: "200px", margin: "auto", display: "block"}}
        alt="Loading..." /> */}
    </div>
  )
}
