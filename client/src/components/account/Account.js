import React, { Component } from 'react'

export default class Account extends Component {
  render() {
    return (
      <div>
        <h2>Account</h2>
        <form>
          <div class="form-row">
            <div class="col">
              <label for="first-name">First Name</label>
              <input type="text" class="form-control" id="first-name" placeholder="First name" />
            </div>
            <div class="col">
            <label for="last-name">Last Name</label>
              <input type="text" id="last-name" class="form-control" placeholder="Last name" />
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" class="form-control" id="email" placeholder="Email" />
          </div>
          <div class="form-group">
            <label for="birthday">Birthday</label>
            <input type="date" class="form-control" id="birthday" />
          </div>
        </form>
      </div>
    )
  }
}
