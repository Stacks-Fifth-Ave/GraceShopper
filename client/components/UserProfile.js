import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {updateUser} from '../store/user.js';

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
    this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    const {data} = await axios.get('/auth/me');
    this.setState({
      user: data
    });
  }

  handleSubmit(event) {
    if (event.target.id === 'emailButton') {
      const newEmail = document.getElementById('newEmail').value;
      this.setState({
        user: {email: newEmail}
      });
      this.props.update(this.state.user, {email: newEmail});
    }
    if (event.target.id === 'passwordButton') {
      const newPassword = document.getElementById('newPassword').value;
      this.setState({
        user: {password: newPassword}
      });
      this.props.update(this.state.user, {password: newPassword});
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Edit Profile</h1>
        <div>
          <form>
            <label>
              <h3>Email</h3>
              <h4>Current Email: {this.state.user.email}</h4>
            </label>
            <input name="email" id="newEmail" type="text" />
            <button
              className="waves-effect waves-light btn-large"
              type="submit"
              id="emailButton"
              onClick={e => this.handleSubmit(e)}
            >
              Update Email
            </button>
          </form>

          <form>
            <label>
              <h3>Password</h3>
              <h4>New Password:</h4>
            </label>
            <input name="password" id="newPassword" type="password" />
            <button
              className="waves-effect waves-light btn-large"
              type="submit"
              id="passwordButton"
              onClick={e => this.handleSubmit(e)}
            >
              Update Password
            </button>
          </form>
          <div className="msg-bar-validation">
            {this.state.validEmail || this.state.email === '' ? (
              <p />
            ) : (
              <p>Please enter a valid e-mail address.</p>
            )}
            {this.state.validPassword || this.state.password === '' ? (
              <p />
            ) : (
              <p>
                A password must contain one upper-case letter, one lower-case
                letter, one numeric digit, a special character, and be between
                8-16 characters in length.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: (user, newInfo) => dispatch(updateUser(user, newInfo))
  };
};

export default connect(null, mapDispatchToProps)(UserProfile);
