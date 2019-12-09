import React from 'react';
import {connect} from 'react-redux';
import {addProduct} from '../store/cart';
import {centsToDollarString, DEFAULT_CURRENCY} from '../formatters';
import {ToastProvider, useToasts} from 'react-toast-notifications';

const SingleProductWithToast = props => {
  const {addToast} = useToasts();
  const addToCart = async value => {
    addToast(`${value.name} added to cart`, {
      appearance: 'success',
      autoDismiss: true
    });
    props.submit(value);
  };

  // convert cents to a string to represent the value in dollars
  return (
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
            onClick={() => addToCart(props.product)}
            type="submit"
          >
            Add to Cart
          </button>
        </div>
      </div>
  );
};

const mapDispatchToProps = dispatch => ({
  submit: product => dispatch(addProduct(product))
});

const ConnectedProduct = connect(null, mapDispatchToProps)(
  SingleProductWithToast
);

const SingleProduct = props => (
  <ToastProvider>
    <ConnectedProduct product={props.product} />
  </ToastProvider>
);

export default SingleProduct;
