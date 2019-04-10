import React, { Component } from 'react'
import classnames from "classnames"
import { connect } from "react-redux"
import { addItem } from "../../../actions/todoActions"
import PropTypes from "prop-types"

class TodoHeader extends Component {
    constructor() {
        super()
        this.state = {
            content: "",
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
            content: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        const newItem = {
            content: this.state.content
        }
        this.props.addItem(newItem)
        this.setState({
            content: ""
        })
    }
    render() {
        const { errors } = this.state
        return (
            <div className="todo-header">
                <h3 className="text-white text-center p-2">Tasks</h3>
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        className={classnames("form-control mb-2", {
                            "is-invalid": errors.content
                        })}
                        id="content"
                        placeholder="Enter Title"
                        value={this.state.content || ""}
                        onChange={this.handleChange} />
                    <button className="btn btn-outline-dark mb-2">Add</button>
                </form>
            </div>
        )
    }
}

TodoHeader.propTypes = {
    addItem: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { addItem })(TodoHeader)
