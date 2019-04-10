import React from 'react'
import { Link } from  "react-router-dom"

function JournalHeader() {
  return (
    <div>
      <Link to="/journal/new" className="btn btn-lg btn-outline-dark">Create new entry</Link>
    </div>
  )
}
export default JournalHeader