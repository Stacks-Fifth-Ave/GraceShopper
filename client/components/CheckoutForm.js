import React from 'react';
import Checkout from './Checkout';
import {clearProducts} from '../store/cart';
import {connect} from 'react-redux';

class CheckoutForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    if (this.props.paid) {
      this.props.clearProducts();
    } else {
      alert('please enter a valid card');
    }
  }

  render() {
    return (
      <div>
        <form name={name}>
          <div>
            <label>
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" />
          </div>
          <div>
            <label>
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" />
          </div>
          <div>
            <label htmlFor="address">
              <small>Address</small>
            </label>
            <input name="address" type="text" />
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
          <button
            className="waves-effect waves-light btn-large"
            type="submit"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
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
