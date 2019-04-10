import React, { Component } from 'react'
import moment from "moment"
import classnames from "classnames"
import { connect } from "react-redux"
import { addRecord } from "../../actions/expenseActions"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import DateGroup from "../common/DateGroup"

class AddTransaction extends Component {
    constructor() {
        super()
        this.state = {
            description: "",
            date: moment().format('YYYY-MM-DD'),
            amount: "",
            debit_credit: "debit",
            category: "",
            account: "",
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors });
        }
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        const newRecord = {
            description: this.state.description,
            date: this.state.date,
            amount: this.state.amount,
            debit_credit: this.state.debit_credit,
            category: this.state.category,
            account: this.state.account
        }
        this.props.addRecord(newRecord, this.props.history)
    }
    render() {
        const { errors } = this.state
        return (
            <div className="row justify-content-center">
                <div className="form-container col-md-6">
                    <h2 className="form-heading">Create new Record</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="description">Description</label>
                            <input
                                type="text"
                                name="description"
                                className={classnames('form-control', {
                                    'is-invalid': errors.description
                                })}
                                id="description"
                                placeholder="Enter a title"
                                value={this.state.description}
                                onChange={this.handleChange} />
                            {errors.description && (<div className="invalid-feedback">{errors.description}</div>)}
                        </div>
                        <div className="row">
                            <DateGroup
                                id="date"
                                label="Date"
                                type="date"
                                name="date"
                                onChange={this.handleChange}
                                value={this.state.date}

                            />
                            <div className="form-group col-md-6">
                                <label for="amount">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.amount
                                    })}
                                    id="amount"
                                    value={this.state.amount}
                                    onChange={this.handleChange} />
                                {errors.amount && (<div className="invalid-feedback">{errors.amount}</div>)}
                            </div>

                        </div>
                        <div className="form-group">
                            <label for="debit_credit">Type</label>
                            <select
                                className={classnames('form-control', {
                                    'is-invalid': errors.debit_credit
                                })}
                                name="debit_credit"
                                id="debit_credit"
                                value={this.state.debit_credit}
                                onChange={this.handleChange} >
                                <option value="debit">Debit</option>
                                <option value="credit">Credit</option>
                            </select>
                            {errors.debit_credit && (<div className="invalid-feedback">{errors.debit_credit}</div>)}
                        </div>
                        <div className="form-group">
                            <label for="Category">Category</label>
                            <select
                                className={classnames('form-control', {
                                    'is-invalid': errors.category
                                })}
                                id="Category"
                                name="category"
                                value={this.state.category}
                                onChange={this.handleChange} >
                                <option value="">Select category</option>
                                <option value="food">Food</option>
                                <option value="education">Education</option>
                                <option value="bills">Bills</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.category && (<div className="invalid-feedback">{errors.category}</div>)}
                        </div>
                        <div className="form-group">
                            <label for="Account">Account</label>
                            <select
                                className={classnames('form-control', {
                                    'is-invalid': errors.account
                                })}
                                id="Account"
                                name="account"
                                value={this.state.account}
                                onChange={this.handleChange} >
                                <option value="">Select account</option>
                                <option value="cash">Cash</option>
                                <option value="bank">Bank</option>
                                <option value="cheque">Cheque</option>
                            </select>
                            {errors.account && (<div className="invalid-feedback">{errors.account}</div>)}
                        </div>
                        <div className="row justify-content-end">
                            <button className="btn btn-lg btn-dark">Submit</button>
                        </div>

                    </form>
                </div >
            </div>
        )
    }
}

AddTransaction.propTypes = {
    addRecord: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { addRecord })(withRouter(AddTransaction))