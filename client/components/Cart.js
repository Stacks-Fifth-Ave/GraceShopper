import React from 'react';
import {connect} from 'react-redux';
import {removeProduct, getCart} from '../store/cart';

class DisconnectedCart extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    getCart();
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
            <p>{product.info.price}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={() => this.props.remove(product)} type="submit">
              Remove
            </button>
          </div>
        ))}
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
    remove: product => dispatch(removeProduct(product))
  };
};

export const Cart = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCart
);
