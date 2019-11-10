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
        <div>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/allProducts">All Products</Link>
          </li>
        </div>
        {props.isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <li>
              <Link to="/orders">Order History</Link>
            </li>
            <li>
              <Link to="/home">User Profile</Link>
            </li>
            <li>
              <Link to="/allUsers">Manage Users</Link>
            </li>
            <li>
              <a href="#" onClick={props.handleClick}>
                Logout
              </a>
            </li>
            <li className="hide-on-large-and-down">
              Logged in as {props.userEmail}
            </li>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>Viewing as guest</li>
          </div>
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
    userEmail: state.user.email
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
