import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from "moment"
import { Redirect, Link } from "react-router-dom"
import { getEvents } from "../../actions/eventActions"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Spinner from "../common/Spinner"

import Toolbar from 'react-big-calendar/lib/Toolbar'
import "react-big-calendar/lib/css/react-big-calendar.css"


class CalendarView extends React.Component {
    constructor() {
        super()
        this.state = {
            redirect: false,
            daySelect: false,
            date: "",
            event: ""
        }
        this.handleSelect = this.handleSelect.bind(this)
        this.createEvent = this.createEvent.bind(this)
    }
    componentDidMount() {
        this.props.getEvents()
    }

    handleSelect(e) {
        this.setState({
            redirect: true,
            event: e
        })

    }
    createEvent(e) {
        this.setState({
            daySelect: true,
            date: e.start
        })
        console.log(e)
    }

    render() {
        const localizer = BigCalendar.momentLocalizer(moment)
        let allViews = ["month", "week"]

        const { events, loading } = this.props.event;
        let calendarContent;

        if (events === null || loading) {
            calendarContent = <Spinner />;
        } else {
            calendarContent = <BigCalendar
                localizer={localizer}
                events={events}
                popup
                selectable="ignoreEvents"
                views={allViews}
                components={{ toolbar: CalendarToolbar }}
                onSelectEvent={this.handleSelect}
                onSelectSlot={this.createEvent}
            />;
        }

        const { redirect, daySelect } = this.state
        if (redirect) {
            return <Redirect to={'/calendar/view/' + this.state.event._id} />
        }
        if (daySelect) {
            return <Redirect to={{
                pathname: "/calendar/new",
                state: {
                    date: this.state.date
                }
            }} />
        }
        return (
            <div style={{ height: "550px" }}>
                {calendarContent}
            </div>
        )
    }
}

CalendarView.propTypes = {
    getEvents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    event: state.event
});


class CalendarToolbar extends Toolbar {

    componentDidMount() {
        const view = this.props.view;
        console.log(view)
    }

    render() {
        return (
            <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                    <Link to="/calendar/new">
                        <span className="add-event">
                            <i 
                                className="fas fa-plus-circle fa-2x" data-toggle="tooltip" 
                                data-placement="top" 
                                title="Add event"></i>
                        </span>
                    </Link>
                </span>
                <span className="rbc-toolbar-label">{this.props.label}</span>
                <span className="rbc-btn-group">
                    <button type="button" onClick={() => this.navigate('TODAY')}>today</button>
                    <button type="button" onClick={() => this.navigate('PREV')}>back</button>
                    <button type="button" onClick={() => this.navigate('NEXT')}>next</button>
                </span>

            </div>
        );
    }
}

export default connect(mapStateToProps, { getEvents })(CalendarView)
