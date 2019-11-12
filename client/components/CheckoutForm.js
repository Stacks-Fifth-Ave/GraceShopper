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
      streetAddress: '',
      street: '',
      aptNo: '',
      city: '',
      state: '',
      zip: '',
      stateList: [
        '',
        'AL',
        'AK',
        'AR',
        'CA',
        'CO',
        'CT',
        'DE',
        'FL',
        'GA',
        'HI',
        'ID',
        'IL',
        'IN',
        'IA',
        'KS',
        'KY',
        'LA',
        'ME',
        'MD',
        'MA',
        'MI',
        'MN',
        'MS',
        'MO',
        'MT',
        'NE',
        'NV',
        'NH',
        'NJ',
        'NM',
        'NY',
        'NC',
        'ND',
        'OH',
        'OK',
        'OR',
        'PA',
        'RI',
        'SC',
        'SD',
        'TN',
        'TX',
        'UT',
        'VT',
        'VA',
        'WA',
        'WV',
        'WI',
        'WY',
        'DC',
        'AS',
        'GU',
        'MP',
        'PR',
        'VI'
      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
        <form name="checkout-form">
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
          <div />
          <div>
            <label htmlFor="streetAddress">
              <small>Street Address</small>
            </label>
            <input
              name="streetAddress"
              type="text"
              value={this.state.streetAddress}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="street">
              <small>Street</small>
            </label>
            <input
              name="street"
              type="text"
              value={this.state.street}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="aptNo">
              <small>Apt. No.</small>
            </label>
            <input
              name="aptNo"
              type="text"
              value={this.state.aptNo}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="city">
              <small>City</small>
            </label>
            <input
              name="city"
              type="text"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="state">
              <small>State</small>
            </label>
            <select
              name="state"
              value={this.state.state}
              onChange={this.handleChange}
            >
              {this.state.stateList.map((state, idx) => (
                <option key={idx} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="zip">
              <small>Zip</small>
            </label>
            <input
              name="zip"
              type="text"
              value={this.state.zip}
              onChange={this.handleChange}
            />
          </div>
        </form>
        <div>
          <Checkout
            name="Checkout"
            description="enter you account email"
            amount={this.props.total}
          />
        </div>
        <div>
          {this.state.firstName !== '' &&
          this.state.lastName !== '' &&
          this.state.streetAddress !== '' &&
          this.state.street !== '' &&
          this.state.city !== '' &&
          this.state.state !== '' &&
          this.state.zip.length === 5 ? (
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
  paid: state.cart.paid,
  total: state.cart.total / 100
});

const mapDispatchToProps = dispatch => ({
  clearProducts: () => dispatch(clearProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
