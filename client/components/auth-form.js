import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {auth} from '../store';
import {emailValidator, passwordValidator} from '../validators';

/**
 * COMPONENT
 */
class AuthForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validEmail: false,
      validPassword: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    let validator = 'valid' + name[0].toUpperCase() + name.slice(1);

    this.setState({
      [name]: value
    });

    if (name === 'email') {
      this.setState({
        [validator]: emailValidator(value)
      });
    } else if (name === 'password') {
      this.setState({
        [validator]: passwordValidator(value, this.state.email)
      });
    }
  }

  render() {
    const {name, displayName, handleSubmit, error} = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {this.state.email === '' ? (
              <div>
                <p className="hidden">✅</p>
              </div>
            ) : (
              <div>{this.state.validEmail ? <p>✅</p> : <p>❌</p>}</div>
            )}
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            {this.state.password === '' ? (
              <div>
                <p className="hidden">✅</p>
              </div>
            ) : (
              <div>{this.state.validPassword ? <p>✅</p> : <p>❌</p>}</div>
            )}
          </div>
          {this.state.validPassword && this.state.validEmail ? (
            <div>
              <button type="submit">{displayName}</button>
            </div>
          ) : (
            <div>
              <button type="submit" disabled>
                {displayName}
              </button>
            </div>
          )}
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    );
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
