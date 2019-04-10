import {
    EVENT_LOADING,
    EVENT_LOADED,
    GET_EVENTS,
    GET_EVENT,
    ADD_EVENT,
    DELETE_EVENT
} from "../actions/types"

const initialState = {
    events: [],
    event: {},
    loading: false
}

export default function (
    state = initialState,
    action
) {
    switch (action.type) {
        case EVENT_LOADING:
            return {
                ...state,
                loading: true
            }
        case EVENT_LOADED:
            return {
                ...state,
                loading: false
            }
        case GET_EVENTS:
            return {
                ...state,
                events: action.payload,
                loading: false
            }
        case GET_EVENT:
            return {
                ...state,
                event: action.payload,
                loading: false
            }
        case ADD_EVENT:
            return {
                ...state,
                events: [action.payload, ...state.events]
            }
        case DELETE_EVENT:
            return {
                ...state,
                events: [state.events.filter(event => event._id !== action.payload)]
            }
        default:
            return state
    }
}