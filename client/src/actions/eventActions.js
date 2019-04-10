import axios from "axios"

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  EVENT_LOADING,
  EVENT_LOADED,
  GET_EVENTS,
  GET_EVENT,
  ADD_EVENT,
  DELETE_EVENT
} from "../actions/types"

// Add Event
export const addEvent = (eventData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/calendar/', eventData)
    .then(res => {
      dispatch({
        type: ADD_EVENT,
        payload: res.data
      })
      history.push("/calendar")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
};

// Get Events
export const getEvents = () => dispatch => {
  dispatch(setEventLoading());
  axios
    .get('/api/calendar/')
    .then(res =>
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EVENTS,
        payload: null
      })
    );
};

// Get Event
export const getEvent = id => dispatch => {
  dispatch(setEventLoading());
  axios
    .get(`/api/calendar/${id}`)
    .then(res =>
      dispatch({
        type: GET_EVENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EVENT,
        payload: null
      })
    );
};

// Edit Event
export const editEvent = (id, eventData, history) => dispatch => {
  axios
      .put(`/api/calendar/${id}`, eventData)
      .then( res => {
          dispatch({
              type: ADD_EVENT,
              payload: res.data
          })
          history.push("/calendar/")
      })
      .catch( err => {
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
      })
}

// Delete Event
export const deleteEvent = (id, history) => dispatch => {
  axios
    .delete(`/api/calendar/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_EVENT,
        payload: id
      })
      history.push("/calendar")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Set Loading Set
export const setEventLoading = () => {
  return {
    type: EVENT_LOADING
  };
};

// Unset loading state
export const unsetEventLoading = () => {
  return {
      type: EVENT_LOADED
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};  
