import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

// temporarily taking implicit return out of this functional compoent
const Navbar = props => (
  <nav>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo right">
        Stacks Fifth Avenue
      </a>
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <>
          <>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/allProducts">All Products</Link>
            </li>
          </>
        </>
        {props.isLoggedIn ? (
          <>
            <>
              {/* The navbar will show these links after you log in */}
              <li>
                <Link to="/orders">Order History</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/userProfile">User Profile</Link>
              </li>
              {props.isAdmin ? (
                <li>
                  <Link to="/allUsers">Manage Users</Link>
                </li>
              ) : null}
              <li>
                <a href="#" onClick={props.handleClick}>
                  Logout
                </a>
              </li>
              <li>{props.userEmail}</li>
            </>
          </>
        ) : (
          <>
            <>
              {/* The navbar will show these links before you log in */}
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <a href="#" />Guest
              </li>
            </>
          </>
        )}
      </ul>
    </div>
  </nav>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userEmail: state.user.email,
    isAdmin: state.user.isAdmin
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
