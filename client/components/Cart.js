import React from 'react';
import {connect} from 'react-redux';
import {removeProduct} from '../store/cart';
const DisconnectedCart = props => {
  console.log(props.products);
  if (props.products.length === 0) {
    return (
      <div>
        <h2>Cart is empty</h2>
      </div>
    );
  }
  return (
    <div>
      {props.products.map(product => (
        <div key={product.id}>
          <img src={product.image} />
          <h1>{product.name}</h1>
          <h2>{product.price}</h2>
        </div>
      ))}
    </div>
  );
};
//map state to props to get cart info from store
const mapStateToProps = state => {
  return {
    products: state.cart.products
  };
};
const mapDispatchToProps = dispatch => {
  return {
    remove: productId => dispatch(removeProduct(productId))
  };
};
export const Cart = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCart
);
