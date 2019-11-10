import React from 'react';
import {connect} from 'react-redux';
import {addProduct} from '../store/cart';
import {centsToDollarString, DEFAULT_CURRENCY} from '../formatters';

const SingleProduct = props => {
  // convert cents to a string to represent the value in dollars
  return (
    <div className="single-product col">
      <div className="card">
        <div className="card-image center">
          <img className="single-product-image" src={props.product.image} />
          <span className="card-title">
            {props.product.name}{' '}
            {centsToDollarString(props.product.price, DEFAULT_CURRENCY)}
          </span>
        </div>
        <div className="card-content center">
          <p>{props.product.description}</p>
          {/* <p>{centsToDollarString(props.product.price, DEFAULT_CURRENCY)}</p> */}
        </div>
        <div className="card-action center">
          <button
            className="waves-effect waves-light btn-large"
            onClick={() => props.submit(props.product)}
            type="submit"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  submit: product => dispatch(addProduct(product))
});

export default connect(null, mapDispatchToProps)(SingleProduct);
