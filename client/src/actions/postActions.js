import axios from "axios"

import {
    POST_LOADING,
    POST_LOADED,
    GET_POSTS,
    GET_POST,
    ADD_POST,
    DELETE_POST,
    GET_ERRORS,
    CLEAR_ERRORS
} from "./types"

// Add post
export const addPost = (postData, history) => dispatch => {
    dispatch(clearErrors())
    axios
        .post("/api/journal/", postData)
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
            history.push("/journal")
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Get posts
export const getPosts = () => dispatch => {
    dispatch(setPostLoading())
    axios
        .get("/api/journal/")
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        })
}

// Get post
export const getPost = (id) => dispatch => {
    dispatch(setPostLoading())
    axios
        .get(`/api/journal/${id}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        })
        )
        .catch(err =>
            dispatch({
                type: GET_POST,
                payload: null
            })
        )
}

// Delete post
export const deletePost = (id, history) => dispatch => {
    axios
        .delete(`/api/journal/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_POST,
                payload: id
            })
            history.push("/journal")
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Edit post
export const editPost = (id, postData, history) => dispatch => {
    axios
        .put(`/api/journal/${id}`, postData)
        .then( res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
            history.push("/journal/")
        })
        .catch( err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

// Unset loading state
export const unsetPostLoading = () => {
    return {
        type: POST_LOADED
    }
}

// Clear errorss
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}