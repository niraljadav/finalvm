import React, { Component } from 'react'
import moment from "moment"
import classnames from "classnames"
import { connect } from "react-redux"
import { addPost } from "../../actions/postActions"
import PropTypes from "prop-types"
import DateGroup from "../common/DateGroup"
import { withRouter, Link } from "react-router-dom"

class AddPost extends Component {
    constructor() {
        super()
        this.state = {
            title: "",
            content: "",
            post_date: moment().format('YYYY-MM-DDTHH:mm'),
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
        const newPost = {
            title: this.state.title,
            content: this.state.content,
            post_date: this.state.post_date
        }
        this.props.addPost(newPost, this.props.history)
    }
    render() {
        const { errors } = this.state
        return (
            <div className="form-container">
                <h2 className="form-heading">Create new Entry</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="row justify-content-start">
                        <div className="form-group col-md-6">
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
                        <DateGroup
                            id="post_date"
                            label="Date"
                            type="datetime-local"
                            name="post_date"
                            onChange={this.handleChange}
                            value={this.state.post_date}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            name="content"
                            className={classnames("form-control", {
                                "is-invalid": errors.content
                            })}
                            id="content"
                            rows="15"
                            placeholder="Enter content"
                            onChange={this.handleChange}
                            value={this.state.content}></textarea>
                        {errors.content && (<div className="invalid-feedback">{errors.content}</div>)}
                    </div>
                    <div className="row justify-content-end">
                        <button type="submit" className="btn btn-lg btn-dark">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

AddPost.propTypes = {
    addPost: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { addPost })(withRouter(AddPost))