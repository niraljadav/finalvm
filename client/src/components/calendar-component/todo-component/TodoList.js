import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import TodoItem from "./TodoItem"
import { getItems } from "../../../actions/todoActions"
import Spinner from "../../common/Spinner"

class TodoList extends Component {
    constructor() {
        super()
        this.state = {
            show: "Completed Tasks"
        }
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        this.props.getItems()
    }
    handleClick() {
        if (this.state.show === "Completed Tasks") {
            this.setState({
                show: "Remaining Tasks"
            })
        } else {
            this.setState({
                show: "Completed Tasks"
            })
        }
    }

    render() {

        const { items, loading } = this.props.todo
        let todoContent

        const completedComponents = items.map(item => {
            if (!item.completed) {
                return <TodoItem key={item.id} item={item} />
            }
            else {
                return null
            }
        }
        )
        const remainingComponents = items.map(item => {
            if (item.completed) {
                return <TodoItem key={item.id} item={item} />
            } else {
                return null
            }
        }
        )

        if (items === null || loading) {
            todoContent = <Spinner />
        } else {
            todoContent = (
                <tbody>
                    {this.state.show === "Completed Tasks" ? completedComponents : remainingComponents}
                    
                </tbody>
            )
        }
        return (
            <div className="todo-list">
                <table className="table">
                {todoContent}
                </table>
                <button onClick={this.handleClick} className="btn btn-outline-dark">Show {this.state.show}</button>
            </div>
        )
    }
}

TodoList.propTypes = {
    getItems: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    todo: state.todo
});

export default connect(mapStateToProps, { getItems })(TodoList)