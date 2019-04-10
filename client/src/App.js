import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import jwt_decode from "jwt-decode"
import setAuthToken from "./utils/setAuthToken"
import { setCurrentUser, logoutUser } from "./actions/authActions"
import { clearCurrentProfile } from "./actions/profileActions"
import { Provider } from "react-redux"
import store from "./store"

import PrivateRoute from "./components/common/PrivateRoute"

import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"

import NotFound from "./components/not-found/NotFound"

import Calendar from "./components/calendar-component/Calendar"
import AddEvent from "./components/calendar-component/AddEvent"
import EditEvent from "./components/calendar-component/EditEvent"
import ViewEvent from "./components/calendar-component/ViewEvent"

import Timeline from "./components/timeline-component/Timeline"

import Journal from "./components/journal-component/Journal"
import ViewPost from "./components/journal-component/ViewPost"
import AddPost from "./components/journal-component/AddPost"
import EditPost from "./components/journal-component/EditPost"

import Expense from "./components/expense-component/Expense"
import AddTransaction from "./components/expense-component/AddTransaction"
import ViewRecord from "./components/expense-component/ViewRecord"
import EditRecord from "./components/expense-component/EditRecord"

import Account from "./components/account/Account"

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken)
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())
    //Clear current Profile
    store.dispatch(clearCurrentProfile())
    // Redirect to login
    window.location.href = "/login"

  }
}

class App extends Component {
  render(props) {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

              <Switch>
            <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Calendar} />

                <PrivateRoute exact path="/calendar" component={Calendar} />

                <PrivateRoute exact path="/calendar/new" component={AddEvent} />

                <PrivateRoute exact path="/calendar/edit/:event_id" component={EditEvent} />

                <PrivateRoute exact path="/calendar/view/:event_id" component={ViewEvent} />
                <PrivateRoute exact path="/journal" component={Journal} />

                <PrivateRoute exact path="/journal/view/:post_id" component={ViewPost} />
                <PrivateRoute exact path="/journal/edit/:post_id" component={EditPost} />
                <PrivateRoute exact path="/journal/new" component={AddPost} />
                <PrivateRoute exact path="/timeline" component={Timeline} />
                <PrivateRoute exact path="/expense-tracker" component={Expense} />
                <PrivateRoute exact path="/expense-tracker/new" component={AddTransaction} />
                <PrivateRoute exact path="/expense-tracker/view/:record_id" component={ViewRecord} />
                <PrivateRoute exact path="/expense-tracker/edit/:record_id" component={EditRecord} />
                <PrivateRoute exact path="/account" component={Account} />
                <Route exact path="/not-found" component={NotFound} />
                <Route exact path="*" component={NotFound} />

              </Switch>
            </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
