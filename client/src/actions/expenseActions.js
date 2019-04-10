import axios from "axios"

import {
    RECORD_LOADING,
    RECORD_LOADED,
    GET_RECORDS,
    GET_RECORD,
    ADD_RECORD,
    DELETE_RECORD,
    GET_ERRORS,
    CLEAR_ERRORS
} from "./types"

// Add record
export const addRecord = (recordData, history) => dispatch => {
    dispatch(clearErrors())
    axios
        .post("/api/expense/", recordData)
        .then(res => {
            dispatch({
                type: ADD_RECORD,
                payload: res.data
            })
            history.push("/expense-tracker")
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Get records
export const getRecords = () => dispatch => {
    dispatch(setRecordLoading())
    axios
        .get("/api/expense/")
        .then(res => {
            dispatch({
                type: GET_RECORDS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_RECORDS,
                payload: null
            })
        })
}

// Get record
export const getRecord = (id) => dispatch => {
    dispatch(setRecordLoading())
    axios
        .get(`/api/expense/${id}`)
        .then(res => dispatch({
            type: GET_RECORD,
            payload: res.data
        })
        )
        .catch(err =>
            dispatch({
                type: GET_RECORD,
                payload: null
            })
        )
}

// Delete record
export const deleteRecord = (id, history) => dispatch => {
    axios
        .delete(`/api/expense/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_RECORD,
                payload: id
            })
            history.push("/expense-tracker")
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Edit record
export const editRecord = (id, recordData, history) => dispatch => {
    axios
        .put(`/api/expense/${id}`, recordData)
        .then(res => {
            dispatch({
                type: ADD_RECORD,
                payload: res.data
            })
            history.push("/expense-tracker")
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Set loading state
export const setRecordLoading = () => {
    return {
        type: RECORD_LOADING
    }
}

// Unset loading state
export const unsetRecordLoading = () => {
    return {
        type: RECORD_LOADED
    }
}

// Clear errorss
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}