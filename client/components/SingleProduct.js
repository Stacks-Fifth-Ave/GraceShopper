import React from 'react';
import {connect} from 'react-redux';
import {addProduct} from '../store/cart';
import {centsToDollarString} from '../formatters';

const CURRENCY = '$';

const SingleProduct = props => {
  // convert cents to a string to represent the value in dollars

  return (
    <div className="single-product">
      <h1>{props.product.name}</h1>
      <img src={props.product.image} />
      <p>{props.product.description}</p>
      <p>{centsToDollarString(props.product.price, CURRENCY)}</p>
      <button onClick={() => props.submit(props.product)} type="submit">
        Add to Cart
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  submit: product => dispatch(addProduct(product))
});

export default connect(null, mapDispatchToProps)(SingleProduct);
