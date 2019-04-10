import React from 'react'
import JournalHeader from "./JournalHeader"
import JournalPosts from "./JournalPosts"

function Journal() {
  return (
    <div className="journal">
        <JournalHeader />
        <JournalPosts />
    </div>
  )
}
export default Journal