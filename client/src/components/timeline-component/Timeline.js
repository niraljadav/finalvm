import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Event from "./Event"
import { getEvents } from "../../actions/eventActions"
import Spinner from "../common/Spinner"
import moment from "moment"
import SelectMonthList from "../common/SelectMonthList"
import SelectYearList from "../common/SelectYearList"

import "./style.css"

class Timeline extends Component {
    constructor() {
        super()
        this.state = {
            year: moment().format("YYYY"),
            month: moment().format("MM")
        }
        this.handleChange = this.handleChange.bind(this)
        this.getFormattedData = this.getFormattedData.bind(this)
    }
    componentDidMount() {
        this.props.getEvents()
    }
    handleChange(e) {
        this.setState
            ({
                [e.target.name]: e.target.value
            })
    }
    getFormattedData(events) {
        const activities = {};
        events.forEach(({ start, end, title, _id }, index) => {
            const date = moment(start);
            const dateStr = date.format("DD MMM YYYY");
            const list = activities[dateStr] || [];
            list.push({
                time: date.format("hh:mm"),
                date: moment(start).format("L"),
                title,
                id: _id,
                key: index,
            });
            activities[dateStr] = list;
            let initstart = start
            while (moment(start).format("L") !== moment(end).format("L")) {
                start = moment(start).add(1, 'd').toString();
                const date = moment(start)
                const dateStr = date.format("DD MMM YYYY");
                const list = activities[dateStr] || [];
                list.push({
                    time: date.format("hh:mm"),
                    title,
                    id: _id,
                    key: index,
                });
                activities[dateStr] = list;
            }
            start = initstart

        });
        return activities;
    }

    render() {
        const { events, loading } = this.props.event;

        let eventContent

        const activities = this.getFormattedData(events)
        const dates = Object.keys(activities)
        dates.sort()

        if (events === null || loading) {
            eventContent = <Spinner />
        } else {
            eventContent = (
                <div className="time-line-ctnr m-4 p-4">
                    {dates.map(d => {
                        if (this.state.year === moment(d).format("YYYY")
                            && this.state.month === moment(d).format("MM")) {
                            return (
                                <ul className="time-line" key={d}>
                                    <li className="time-label">
                                        <span>{d}</span>
                                    </li>
                                    {activities[d].map(({ time, title, key, date, id }) => (
                                        <Event time={time} text={title} key={key} id={id} year={this.state.year}
                                            month={this.state.month} start={date} />
                                    ))}
                                </ul>)

                        }
                    })}
                </div>

            )
        }
        return (
            <div>
                <SelectYearList
                    name="year"
                    onChange={this.handleChange}
                    value={this.state.year}
                />
                <SelectMonthList
                    name="month"
                    onChange={this.handleChange}
                    value={this.state.month}
                />
                {eventContent}
            </div>
        )
    }
}

Timeline.propTypes = {
    getEvents: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    event: state.event
});

export default connect(mapStateToProps, { getEvents })(Timeline)