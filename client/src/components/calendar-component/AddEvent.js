import React, { Component } from 'react'
import moment from "moment"
import classnames from "classnames"
import { connect } from "react-redux"
import { addEvent } from "../../actions/eventActions"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import DateGroup from "../common/DateGroup"

class AddEvent extends Component {
    constructor() {
        super()
        this.state = {
            title: "",
            description: "",
            start: moment().format('YYYY-MM-DDTHH:mm'),
            end: moment().format('YYYY-MM-DDTHH:mm'),
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        if (this.props.location.state) {
            if (this.props.location.state.date !== undefined) {
                this.setState({
                    start: moment(this.props.location.state.date).format('YYYY-MM-DDTHH:mm'),
                    end: moment(this.props.location.state.date).format('YYYY-MM-DDTHH:mm')
                })
            }
        }
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
        const newEvent = {
            title: this.state.title,
            description: this.state.description,
            start: this.state.start,
            end: this.state.end
        }
        this.props.addEvent(newEvent, this.props.history)
    }
    render() {
        const { errors } = this.state
        return (
            <div className="row justify-content-center">
            <div className="form-container col-md-6">
                <h3 className="form-heading">Create new Event</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            className={classnames('form-control', {
                                'is-invalid': errors.title
                            })}
                            id="title"
                            placeholder="Enter title"
                            onChange={this.handleChange}
                            value={this.state.title}
                        />
                        {errors.title && (<div className="invalid-feedback">{errors.title}</div>)}
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Description</label>
                        <textarea
                            name="description"
                            className={classnames("form-control", {
                                "is-invalid": errors.description
                            })}
                            id="description"
                            rows="3"
                            placeholder="Enter description"
                            onChange={this.handleChange}
                            value={this.state.description}></textarea>
                        {errors.description && (<div className="invalid-feedback">{errors.description}</div>)}
                    </div>
                    <div className="row justify-content-start">
                        <DateGroup
                            id="start"
                            label="From: "
                            type="datetime-local"
                            name="start"
                            onChange={this.handleChange}
                            value={this.state.start}

                        />
                        <DateGroup
                            id="end"
                            label="To: "
                            type="datetime-local"
                            name="end"
                            onChange={this.handleChange}
                            value={this.state.end}
                            errors={errors.end}

                        />
                    </div>
                    <div className="row justify-content-center">
                    <button type="submit" className="btn btn-lg btn-dark">Create Event</button>
                    </div>
                </form>
            </div >
            </div>
        )
    }
}

AddEvent.propTypes = {
    addEvent: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { addEvent })(withRouter(AddEvent))