import React from 'react';
import {connect} from 'react-redux';
import {addProduct} from '../store/cart';

const SingleProduct = props => {
  return (
    <div className="single-product">
      <h1>{props.product.name}</h1>
      <img src={props.product.image} />
      <p>{props.product.description}</p>
      <p>{props.product.price}</p>
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
