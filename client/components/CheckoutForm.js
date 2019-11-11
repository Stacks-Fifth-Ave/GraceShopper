import React from 'react';
import Checkout from './Checkout';
import {clearProducts} from '../store/cart';
import {connect} from 'react-redux';

class CheckoutForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      address: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.haandleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.paid) {
      this.props.clearProducts();
    } else {
      alert('please enter a valid card');
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form name={name}>
          <div>
            <label>
              <small>First Name</small>
            </label>
            <input
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>
              <small>Last Name</small>
            </label>
            <input
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="address">
              <small>Address</small>
            </label>
            <input
              name="address"
              type="text"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </div>
        </form>
        <div>
          <Checkout
            name="Checkout"
            description="enter you account email"
            amount={1}
          />
        </div>
        <div>
          {this.state.firstName !== '' &&
          this.state.lastName !== '' &&
          this.state.address !== '' ? (
            <button
              className="waves-effect waves-light btn-large"
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          ) : (
            <button
              className="waves-effect waves-light btn-large"
              type="submit"
              onClick={this.handleSubmit}
              disabled
            >
              Submit
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paid: state.cart.paid
});

const mapDispatchToProps = dispatch => ({
  clearProducts: () => dispatch(clearProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
