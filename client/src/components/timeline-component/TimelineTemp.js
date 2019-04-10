import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Event from "./Event"
import { getEvents } from "../../actions/eventActions"
import Spinner from "../common/Spinner"
import moment from "moment"
import SelectMonthList from "../common/SelectMonthList"
import SelectYearList from "../common/SelectYearList"

class Timeline extends Component {
    constructor() {
        super()
        this.state = {
            year: moment().format("YYYY"),
            month: moment().format("MM")
        }
        this.handleChange = this.handleChange.bind(this)
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

    render() {
        const { events, loading } = this.props.event;
        let eventContent

        let toreturn = []

        let eventComponents = events
            .map(event => {
                toreturn.push(
                    <Event
                        key={event._id}
                        title={event.title}
                        description={event.description}
                        start={event.start}
                        end={event.end}
                        id={event._id}
                        year={this.state.year}
                        month={this.state.month} />
                )
                let i = 0
                let initstart = event.start
                while (moment(event.start).format("LL") !== moment(event.end).format("LL")) {
                    event.start = moment(event.start).add(1, 'd').toString();
                    toreturn.push(
                        <Event
                            allDay={true}
                            key={event._id + i}
                            title={event.title}
                            description={event.description}
                            start={event.start}
                            end={event.end}
                            id={event._id}
                            year={this.state.year}
                            month={this.state.month} />
                    )
                    i++;
                }
                event.start = initstart
            })

        toreturn = toreturn.sort((a, b) => new moment(a.props.start).format('YYYYMMDD') - new moment(b.props.start).format('YYYYMMDD'))



        if (events === null || loading) {
            eventContent = <Spinner />
        } else {
            eventContent = (
                <div>
                    {toreturn}
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