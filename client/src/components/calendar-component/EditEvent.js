import React, { Component } from 'react'
import moment from "moment"
import classnames from "classnames"
import { connect } from "react-redux"
import { editEvent, getEvent, setEventLoading, unsetEventLoading } from "../../actions/eventActions"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import axios from "axios"
import Spinner from '../common/Spinner';
import DateGroup from "../common/DateGroup"

class EditEvent extends Component {
    constructor() {
        super()
        this.state = {
            title: "",
            description: "",
            start: "",
            end: "",
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        this.props.getEvent(this.props.match.params.event_id)
        this.props.setEventLoading()
        axios
            .get(`/api/calendar/${this.props.match.params.event_id}`)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    start: moment(res.data.start).format('YYYY-MM-DDTHH:mm'),
                    end: moment(res.data.end).format('YYYY-MM-DDTHH:mm')
                })
            }
            )
            .catch(err => {
                console.log(err.response.data)
            }
            )
        this.props.unsetEventLoading()
    }
    componentWillReceiveProps(newProps) {
        if (newProps.event.event === null && !this.props.event.loading) {
            this.props.history.push('/not-found');
          }
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
        const updatedEvent = {
            title: this.state.title,
            description: this.state.description,
            start: this.state.start,
            end: this.state.end
        }
        this.props.editEvent(this.props.event.event._id, updatedEvent, this.props.history)
    }
    render() {
        const { errors } = this.state
        const { event, loading } = this.props.event
        if (event === null || loading || Object.keys(event).length === 0) {
            return (<Spinner />)
        } else {
            return (
                <div className="row justify-content-center">
                    <div className="form-container col-md-6">
                        <h3 className="form-heading">Edit Event</h3>
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
                                <button type="submit" className="btn btn-lg btn-dark">Edit Event</button>
                            </div>
                        </form>
                    </div >
                </div>
            )
        }
    }
}

EditEvent.propTypes = {
    getEvent: PropTypes.func.isRequired,
    editEvent: PropTypes.func.isRequired,
    setEventLoading: PropTypes.func.isRequired,
    unsetEventLoading: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    event: state.event
})

export default connect(mapStateToProps, { editEvent, getEvent, setEventLoading, unsetEventLoading })(withRouter(EditEvent))