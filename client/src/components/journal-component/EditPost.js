import React, { Component } from 'react'
import moment from "moment"
import classnames from "classnames"
import { connect } from "react-redux"
import { editPost, getPost, setPostLoading, unsetPostLoading } from "../../actions/postActions"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import axios from "axios"
import Spinner from '../common/Spinner';
import DateGroup from "../common/DateGroup"

class EditPost extends Component {
    constructor() {
        super()
        this.state = {
            title: "",
            content: "",
            post_date: "",
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        this.props.getPost(this.props.match.params.post_id)
        this.props.setPostLoading()
        axios
            .get(`/api/journal/${this.props.match.params.post_id}`)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    content: res.data.content,
                    post_date: moment(res.data.post_date).format('YYYY-MM-DDTHH:mm')
                })
            }
            )
            .catch(err => {
                console.log(err.response.data)
            }
            )
        this.props.unsetPostLoading()
    }

    componentWillReceiveProps(newProps) {
        if (newProps.post.post === null && !this.props.post.loading) {
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
        const updatedPost = {
            title: this.state.title,
            content: this.state.content,
            post_date: this.state.post_date
        }
        this.props.editPost(this.props.post.post._id, updatedPost, this.props.history)
    }
    render() {
        const { errors } = this.state
        const { post, loading } = this.props.post
        if (post === null || loading || Object.keys(post).length === 0) {
            return (<Spinner />)
        } else {
            return (
                <div className="form-container">
                    <h2 className="form-heading">Change Entry</h2>
                    <form onSubmit={this.handleSubmit} className="p-4">
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
                            <button type="submit" className="btn btn-lg btn-dark">Change</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

EditPost.propTypes = {
    getPost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    setPostLoading: PropTypes.func.isRequired,
    unsetPostLoading: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    post: state.post
})

export default connect(mapStateToProps, { editPost, getPost, setPostLoading, unsetPostLoading })(withRouter(EditPost))