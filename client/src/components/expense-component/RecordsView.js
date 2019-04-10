import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Record from "./Record"
import { getRecords } from "../../actions/expenseActions"
import Spinner from "../common/Spinner"
import SelectMonthList from "../common/SelectMonthList"
import SelectYearList from "../common/SelectYearList"
import moment from "moment"

class RecordsView extends Component {
    constructor() {
        super()
        this.state = {
            month: moment().format("MM"),
            year: moment().format("YYYY")
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.props.getRecords()
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { records, loading } = this.props.expense;
        let recordContent
        let balance = 0

        let recordComponents = records.map(record => <Record
            key={record._id}
            record={record} />)

        if (records === null || loading) {
            recordContent = <Spinner />
        } else {
            recordContent = (
                <table class="table table-bordered text-center">
                    <thead style={{backgroundColor: "#351431", color: "white"}}>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Description</th>
                            {/* <th scope="col">Account</th>
                            <th scope="col">Category</th> */}
                            <th scope="col"></th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records.map(record => {
                                if (moment(record.date).format("MM") === this.state.month) {
                                    if (record.debit_credit === "debit") {
                                        balance = balance - record.amount
                                    } else {
                                        balance = balance + record.amount
                                    }
                                    return (
                                        <tr>
                                            <td>{moment(record.date).format('DD')}</td>
                                            <td>{record.description}</td>
                                            {/* <td>{record.account}</td>
                                            <td>{record.category}</td> */}
                                            <td>{record.debit_credit === "debit" ?
                                                <i className="fas fa-minus"></i> :
                                                <i className="fas fa-plus"></i>}</td>
                                            <td>{record.amount}</td>
                                        </tr>
                                    )
                                }
                            }
                            )}
                        <tr style={{backgroundColor: "#D3C4D1", fontWeight: "bold", color: "#351431"}}>
                            <td colSpan="3" className="text-right">Balance</td>
                            <td>{balance}</td>
                        </tr>
                    </tbody>
                </table>
            )

        }
        return (
            <div>
                <div className="row justify-content-end m-2">
                <SelectYearList
                    value={this.state.year}
                    name="year"
                    onChange={this.handleChange}
                />
                <SelectMonthList
                    value={this.state.month}
                    name="month"
                    onChange={this.handleChange}
                />
                </div>
                <div className="row justify-content-center m-5">
                {recordContent}
                </div>
            </div>
        )
    }
}

RecordsView.propTypes = {
    getRecords: PropTypes.func.isRequired,
    expense: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    expense: state.expense
});

export default connect(mapStateToProps, { getRecords })(RecordsView)