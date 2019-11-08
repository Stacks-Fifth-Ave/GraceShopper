import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

// temporarily taking implicit return out of this functional compoent
const Navbar = props => (
  <div>
    <h1>Stacks Fifth Avenue</h1>
    <nav>
      <div>
        <Link to="/cart">Cart</Link>
        <Link to="/allProducts">All Products</Link>
      </div>
      {props.isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">User Profile</Link>
          <a href="#" onClick={props.handleClick}>
            Logout
          </a>
          {props.userEmail}
          <Link to="/allUsers">Manage Users</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          Guest
        </div>
      )}
    </nav>
    <hr />
  </div>
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
