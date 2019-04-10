import React, { Component } from 'react'
import moment from "moment"
import classnames from "classnames"
import { connect } from "react-redux"
import { editRecord, getRecord, setRecordLoading, unsetRecordLoading } from "../../actions/expenseActions"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import axios from "axios"
import Spinner from '../common/Spinner';

class EditRecord extends Component {
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
    componentDidMount() {
        this.props.getRecord(this.props.match.params.record_id)
        this.props.setRecordLoading()
        axios
            .get(`/api/expense/${this.props.match.params.record_id}`)
            .then(res => {
                this.setState({
                    description: res.data.description,
                    date: moment(res.data.date).format('YYYY-MM-DD'),
                    amount: res.data.amount,
                    debit_credit: res.data.debit_credit,
                    category: res.data.category,
                    account: res.data.account
                })
            }
            )
            .catch(err => {
                console.log(err.response.data)
            }
            )
        this.props.unsetRecordLoading()
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
        const updatedRecord = {
            description: this.state.description,
            date: this.state.date,
            amount: this.state.amount,
            debit_credit: this.state.debit_credit,
            category: this.state.category,
            account: this.state.account
        }
        this.props.editRecord(this.props.post.record._id, updatedRecord, this.props.history)
    }
    render() {
        const { errors } = this.state
        const { record, loading } = this.props.expense
        if (record === null || loading || Object.keys(record).length === 0) {
            return (<Spinner />)
        } else {
            return (
                <div>
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
                        <div className="form-group">
                            <label for="date">Date</label>
                            <input
                                type="date"
                                name="date"
                                className={classnames('form-control', {
                                    'is-invalid': errors.date
                                })}
                                id="date"
                                value={this.state.date}
                                onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
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
                        <button className="btn btn-lg btn-primary">Submit</button>
                    </form>
                </div >
            )
        }
    }
}

EditRecord.propTypes = {
    getRecord: PropTypes.func.isRequired,
    editRecord: PropTypes.func.isRequired,
    setRecordLoading: PropTypes.func.isRequired,
    unsetRecordLoading: PropTypes.func.isRequired,
    expense: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    expense: state.expense
})

export default connect(mapStateToProps, { editRecord, getRecord, setRecordLoading, unsetRecordLoading })(withRouter(EditRecord))