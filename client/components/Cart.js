import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {removeProduct, getCart, clearProducts} from '../store/cart';
import {centsToDollarString, DEFAULT_CURRENCY} from '../formatters.js';
import Checkout from './Checkout';
import CheckoutForm from './CheckoutForm';

class DisconnectedCart extends React.Component {
  constructor() {
    super();
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  componentDidMount() {}

  calculateTotal() {
    return this.props.products.reduce((total, product) => {
      total += product.info.price * product.quantity;
      return total;
    }, 0);
  }

  render() {
    if (this.props.products.length === 0) {
      return (
        <div>
          <h2>Cart is empty</h2>
        </div>
      );
    }
    return (
      <div>
        {this.props.products.map(product => (
          <div key={product.info.id}>
            <img src={product.info.image} />
            <h1>{product.info.name}</h1>
            <p>{centsToDollarString(product.info.price, DEFAULT_CURRENCY)}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={() => this.props.remove(product)} type="submit">
              Remove
            </button>
          </div>
        ))}
        <p>
          Total: {centsToDollarString(this.calculateTotal(), DEFAULT_CURRENCY)}
        </p>

        <Link to="/checkout">
          <button
            type="submit"
            onClick={() => this.props.clear(this.props.products)}
          >
            checkout
          </button>
        </Link>
      </div>
    );
  }
}

//map state to props to get cart info from store
const mapStateToProps = state => {
  return {
    products: state.cart.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    remove: product => dispatch(removeProduct(product)),
    clear: products => dispatch(clearProducts(products)),
    getCart: dispatch(getCart())
  };
};

export const Cart = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCart
);
