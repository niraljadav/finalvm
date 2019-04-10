import React, { Component } from 'react'
import { getEvent, deleteEvent } from "../../actions/eventActions"
import { connect } from "react-redux"
import Spinner from "../common/Spinner"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import moment from "moment"

class ViewEvent extends Component {
    constructor() {
        super()
        this.handleDelete = this.handleDelete.bind(this)
    }
    componentDidMount() {
        this.props.getEvent(this.props.match.params.event_id);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.event.event === null && this.props.event.loading) {
          this.props.history.push('/not-found');
        }
      }
    handleDelete() {
        this.props.deleteEvent(this.props.event.event._id, this.props.history)
    }
    render() {
        const { event, loading } = this.props.event;
        let eventContent;

        if (event === null || loading || Object.keys(event).length === 0) {
            eventContent = <Spinner />;
        } else {
            eventContent = (
                <div className="view container-fluid text-center">
                    <h2 className="m-0">{event.title}</h2>
                    {
                        moment(event.start).format("DD MMMM YYYY") === moment(event.end).format("DD MMMM YYYY")
                            ? <p className="text-muted p-0 m-0">{moment(event.start).format("DD MMMM YYYY")}</p>
                            : <p className="text-muted p-0 m-0">{moment(event.start).format("DD MMMM YYYY")}-{moment(event.end).format("DD MMMM YYYY")}</p>
                    }
                    {
                        moment(event.start).format("h:mm a") === moment(event.end).format("h:mm a")
                            ? <p className="text-muted p-0">{moment(event.start).format("h:mm a")}</p>
                            : <p className="text-muted p-0 m-0">{moment(event.start).format("h:mm a")}-{moment(event.end).format("h:mm a")}</p>
                    }
                    <div className="content">
                        <p>{event.description}</p>
                    </div>
                    <div className="row justify-content-around mt-4">
                        <Link to={"/calendar/edit/" + event._id} className="btn btn-dark mr-2">Change</Link>
                        <button onClick={this.handleDelete} className="btn btn-secondary">Delete</button>
                    </div>
                </div>
            );
        }
        return (
            <div>
                {eventContent}
            </div>
        )
    }
}

ViewEvent.propTypes = {
    getEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    event: state.event
});


export default connect(mapStateToProps, { getEvent, deleteEvent })(ViewEvent)