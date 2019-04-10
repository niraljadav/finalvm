import React, { Component } from 'react'
import { Link } from "react-router-dom"
import RecordsView from "./RecordsView"

import "./expense.css"

export default class Expense extends Component {
    render() {
        return (
            <div>
                <Link to="/expense-tracker/new" className="btn btn-lg btn-outline-dark">Add Transaction</Link>
                <RecordsView />
            </div>
        )
    }
}
