import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

const Navbar = props => (
  <nav>
    <div className="nav-wrapper">
      <ul id="nav-mobile">
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/allProducts">All Products</Link>
        </li>
        {props.isLoggedIn ? (
          <li>
            <Link to="/orders">Order History</Link>
          </li>
        ) : null}
        {props.isLoggedIn ? (
          <li>
            <Link to="/home">User Profile</Link>
          </li>
        ) : null}
        {props.isLoggIn && props.isAdmin ? (
          <li>
            <Link to="/allUsers">Manage Users</Link>
          </li>
        ) : null}
        {props.isLoggedIn ? (
          <li>
            <a href="#" onClick={props.handleClick}>
              Logout
            </a>
          </li>
        ) : null}
        {props.isLoggedIn ? null : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {props.isLoggedIn ? null : (
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        )}
        {props.isLoggedIn ? null : (
          <li>
            <a href="#" />Guest
          </li>
        )}
      </ul>
      <a href="#" className="brand-logo right">
        Stacks Fifth Avenue
      </a>
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
