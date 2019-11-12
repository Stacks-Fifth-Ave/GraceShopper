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
      // let userCopy = JSON.parse(JSON.stringify(this.state.user));

      // userCopy.email = newEmail;
      // this.setState({
      //   user: userCopy
      // });
      this.setState({
        user: {email: newEmail}
      });
      this.props.update(this.state.user, {email: newEmail});
    }
    // if (event.target.id === 'passwordButton') {
    // }
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
            <input name="password" type="text" />
            <button
              className="waves-effect waves-light btn-large"
              type="submit"
              id="passwordButton"
              onClick={this.handleSubmit}
            >
              Update Password
            </button>
          </form>
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
