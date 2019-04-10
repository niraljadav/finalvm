import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { loginUser } from "../../actions/authActions"
import TextFieldGroup from "../common/TextFieldGroup"

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/dashboard")
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push("/dashboard")
    }
    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData)
  }

  render() {
    const { errors } = this.state
    return (
      <div className="row justify-content-center">
      <div className="form-container col-md-5 mt-5">
        <h3 className="form-heading">Log In</h3>
        <form noValidate onSubmit={this.handleSubmit}>
          <TextFieldGroup
            type="email"
            placeholder="Enter Email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            error={errors.email}
            text="Email Address: "
          />
          <TextFieldGroup
            type="password"
            placeholder="Enter Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            error={errors.password}
            text="Password: "
          />
          <div className="row justify-content-md-around mx-2">
            <button className="btn btn-lg btn-dark">Log In</button>
            <Link to="/register" className="btn btn-lg btn-secondary">Create account</Link>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);
