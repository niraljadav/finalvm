import {combineReducers} from "redux"
import authReducer from "./authReducer"
import errorReducer from "./errorReducer"
import profileReducer from "./profileReducer"
import eventReducer from "./eventReducer"
import postReducer from "./postReducer"
import todoReducer from "./todoReducer"
import expenseReducer from "./expenseReducer"

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    event: eventReducer,
    post: postReducer,
    todo: todoReducer,
    expense: expenseReducer
})