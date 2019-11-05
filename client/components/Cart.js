import React from 'react';
import {connect} from 'react-redux';

const DisconnectedCart = props => {
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
//map dispatch to props to remove items from cart
//TBD
// }
const Cart = connect(mapStateToProps)(DisconnectedCart);
export default Cart;
