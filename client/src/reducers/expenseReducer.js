import {
    RECORD_LOADING,
    RECORD_LOADED,
    GET_RECORDS,
    GET_RECORD,
    ADD_RECORD,
    DELETE_RECORD
} from "../actions/types"

const initialState = {
    records: [],
    record: {},
    loading: false
}

export default function (
    state = initialState,
    action
) {
    switch (action.type) {
        case RECORD_LOADING:
            return {
                ...state,
                loading: true
            }
        case RECORD_LOADED:
            return {
                ...state,
                loading: false
            }
        case GET_RECORDS:
            return {
                ...state,
                records: action.payload,
                loading: false
            }
        case GET_RECORD:
            return {
                ...state,
                record: action.payload,
                loading: false
            }
        case ADD_RECORD:
            return {
                ...state,
                records: [action.payload, ...state.records]

            }
        case DELETE_RECORD:
            return {
                ...state,
                records: [state.records.filter(record => record._id !== action.payload)]
            }
        default:
            return state
    }
}