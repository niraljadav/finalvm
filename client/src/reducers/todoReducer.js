import {
    ITEM_LOADING,
    ITEM_LOADED,
    GET_ITEMS,
    GET_ITEM,
    ADD_ITEM,
    DELETE_ITEM
} from "../actions/types"

const initialState = {
    items: [],
    item: {},
    loading: false
}

export default function (
    state = initialState,
    action
) {
    switch (action.type) {
        case ITEM_LOADING:
            return {
                ...state,
                loading: true
            }
        case ITEM_LOADED:
            return {
                ...state,
                loading: false
            }
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case GET_ITEM:
            return {
                ...state,
                item: action.payload,
                loading: false
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]

            }
        case DELETE_ITEM:
            return {
                ...state,
                items: [state.items.filter(item => item._id !== action.payload)]
            }
        default:
            return state
    }
}