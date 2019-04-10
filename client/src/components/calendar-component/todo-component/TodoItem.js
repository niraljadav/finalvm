import React from "react"
import { getItem, deleteItem, editItem } from "../../../actions/todoActions"
import PropTypes from "prop-types"
import { connect } from "react-redux"

class TodoItem extends React.Component {
    constructor() {
        super()
        this.state = {
            id: "",
            completed: ""
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.setState({
            id: this.props.item._id,
            completed: this.props.item.completed
        })
    }

    handleDelete() {
        this.props.deleteItem(this.state.id)
    }
    handleChange(e) {
        this.setState(prevState => ({
            completed: !prevState.completed
        }), () => {
            const itemData = {
                completed: this.state.completed
            }
            this.props.editItem(this.state.id, itemData)
        })
    }
    render(props) {
        return (
            <tr className="todo-item">
                <td className="check-container">
                    <label className="col-md-8">
                        <span className="mr-3">
                            {this.props.item.completed ?
                                <i className="check-square"></i>
                                : <i className="square"></i>}
                        </span>
                        <input hidden
                            type="checkbox"
                            checked={this.state.completed}
                            onChange={this.handleChange}
                        />
                    </label>
                </td>
                <td>
                    {this.props.item.content}
                </td>
                <td>
                    <span className="col-md-2" onClick={this.handleDelete}><i className="fas fa-trash-alt"></i></span>
                </td>
            </tr>
        )
    }
}

TodoItem.propTypes = {
    getItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    todo: state.todo
})

export default connect(mapStateToProps, { getItem, deleteItem, editItem })(TodoItem)