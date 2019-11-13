import React from 'react';
import {connect} from 'react-redux';
import {deleteUser} from '../store/user';

const SingleUser = props => {
  return (
    <div className="single-user">
      <h2>{props.user.email}</h2>
      <button
        className="waves-effect waves-light btn-large"
        onClick={() => props.remove(props.user)}
        type="submit"
      >
        Remove User
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  remove: user => dispatch(deleteUser(user))
});

export default connect(null, mapDispatchToProps)(SingleUser);
