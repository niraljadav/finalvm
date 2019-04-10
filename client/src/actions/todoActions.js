import axios from "axios"

import {
    ITEM_LOADING,
    ITEM_LOADED,
    GET_ITEMS,
    GET_ITEM,
    ADD_ITEM,
    DELETE_ITEM,
    GET_ERRORS,
    CLEAR_ERRORS
} from "./types"

// Add item
export const addItem = (itemData) => dispatch => {
    dispatch(clearErrors())
    axios
        .post("/api/todo/", itemData)
        .then(res => {
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
            dispatch(getItems())
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Get items
export const getItems = () => dispatch => {
    dispatch(setItemLoading())
    axios
        .get("/api/todo/")
        .then(res => {
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ITEMS,
                payload: null
            })
        })
}

// Get item
export const getItem = (id) => dispatch => {
    dispatch(setItemLoading())
    axios
        .get(`/api/todo/${id}`)
        .then(res => dispatch({
            type: GET_ITEM,
            payload: res.data
        })
        )
        .catch(err =>
            dispatch({
                type: GET_ITEM,
                payload: null
            })
        )
}

// Delete item
export const deleteItem = (id) => dispatch => {
    axios
        .delete(`/api/todo/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })
            dispatch(getItems())
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Edit item
export const editItem = (id, itemData) => dispatch => {
    axios
        .put(`/api/todo/${id}`, itemData)
        .then( res => {
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
            dispatch(getItems())
        })
        .catch( err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Set loading state
export const setItemLoading = () => {
    return {
        type: ITEM_LOADING
    }
}

// Unset loading state
export const unsetItemLoading = () => {
    return {
        type: ITEM_LOADED
    }
}

// Clear errorss
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}