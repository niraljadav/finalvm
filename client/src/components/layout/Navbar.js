import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { logoutUser } from "../../actions/authActions"
import { clearCurrentProfile } from "../../actions/profileActions"

class Navbar extends React.Component {
    onLogoutClick(event) {
        event.preventDefault()
        this.props.clearCurrentProfile()
        this.props.logoutUser()
    }
    render() {
        const { isAuthenticated, user } = this.props.auth

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item" onClick={this.changeActive}>
                    <Link className="nav-link" to="/calendar">Calendar</Link>
                </li>
                <li className="nav-item" onClick={this.changeActive}>
                    <Link className="nav-link" to="/journal">Journal</Link>
                </li>
                <li className="nav-item" onClick={this.changeActive}>
                    <Link className="nav-link" to="/timeline">Timeline</Link>
                </li>
                <li className="nav-item" onClick={this.changeActive}>
                    <Link className="nav-link" to="/expense-tracker">Expense Manager</Link>
                </li>
                <li className="nav-item dropdown">
                    {/* eslint-disable-next-line */}
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {user.name}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <div className="triangle"></div>
                        {/* <Link to="/account" className="dropdown-item">Account</Link> */}
                        {/* <Link to="/contact" className="dropdown-item">Contact Us</Link> */}
                        {/* eslint-disable-next-line */}
                        <a href="#" onClick={this.onLogoutClick.bind(this)} className="dropdown-item">
                            {/* <img src={user.avatar} alt={user.name} style={{width: "25px", marginRight: "5px"}}/> */}
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
        )

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-sm h-5 sticky-top mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">Plan Your Life</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        {isAuthenticated ? authLinks : guestLinks}

                    </div>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar)