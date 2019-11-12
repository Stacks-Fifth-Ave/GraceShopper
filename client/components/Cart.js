import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {removeProduct, getCart, clearProducts, addTotal} from '../store/cart';
import {centsToDollarString, DEFAULT_CURRENCY} from '../formatters.js';

class DisconnectedCart extends React.Component {
  constructor() {
    super();
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  componentDidMount() {
    getCart();
  }

  calculateTotal() {
    const total = this.props.products.reduce((total, product) => {
      total += product.info.price * product.quantity;
      return total;
    }, 0);
    this.props.addTotal(total);
    return total;
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
        <div className="row">
          {this.props.products.map(product => (
            <div className="card single-product" key={product.info.id}>
              <div className="card-image center">
                <img
                  className="single-product-image"
                  src={product.info.image}
                />
              </div>
              <div className="card-content center">
                <span className="card-title">
                  {product.info.name} - Quantity: {product.quantity} - Cost per
                  item{' '}
                  {centsToDollarString(product.info.price, DEFAULT_CURRENCY)} -
                  Total cost:{' '}
                  {centsToDollarString(
                    product.info.price * product.quantity,
                    DEFAULT_CURRENCY
                  )}
                </span>
              </div>
              <div className="card-action center">
                <button
                  className="waves-effect waves-light btn-large"
                  onClick={() => this.props.remove(product)}
                  type="submit"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="foot center">
          <h2>
            Total:
            {centsToDollarString(this.calculateTotal(), DEFAULT_CURRENCY)}
          </h2>
          <div className="card-action center">
            <Link to="/checkout">
              <button
                className="waves-effect waves-light btn-large"
                type="submit"
              >
                checkout
              </button>
            </Link>
          </div>
        </div>
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
    getCart: dispatch(getCart()),
    addTotal: total => dispatch(addTotal(total))
  };
};

export const Cart = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCart
);
