import React, { Component } from 'react'
import { getRecord, deleteRecord } from "../../actions/expenseActions"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import Spinner from "../common/Spinner"

class ViewRecord extends Component {
    constructor(){
        super()
        this.handleDelete = this.handleDelete.bind(this)
    }
    componentDidMount() {
        this.props.getRecord(this.props.match.params.record_id)
    }
    handleDelete(){
        this.props.deleteRecord(this.props.expense.record._id, this.props.history)
    }

    render() {

        const { record, loading } = this.props.expense
        let recordContent

        if (record === null || loading || Object.keys(record).length === 0){
            recordContent = (
                <Spinner />
            )
        } else {
            recordContent = (
                <div>
                    <h2>{record.description}</h2>
                    <h4 className="text-muted">{record.date}</h4>
                    <p>{record.amount}</p>
                    <p>{record.type}</p>
                    <p>{record.category}</p>
                    <p>{record.account}</p>
                    <Link to={"/expense-tracker/edit/"+record._id}>Edit</Link>
                    <button onClick={this.handleDelete}>Delete</button>
                </div>
            )
        }
            return (
                <div>
                    {recordContent}
                </div>
            )
    }
}

ViewRecord.propTypes = {
    getRecord: PropTypes.func.isRequired,
    expense: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    expense: state.expense
})

export default connect(mapStateToProps, { getRecord, deleteRecord })(withRouter(ViewRecord))