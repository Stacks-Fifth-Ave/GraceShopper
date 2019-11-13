import React from 'react';
import {connect} from 'react-redux';
import {centsToDollarString, DEFAULT_CURRENCY} from '../formatters';
import {deleteProduct} from '../store/products';

const UnconnectedManageSingleProduct = props => {
  console.log('PROPSSSS', props);
  return (
    <div className="center single-product">
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
        </div>
      </div>
      <button
        className="waves-effect waves-light btn-large"
        onClick={() => props.delete(props.product)}
        type="submit"
      >
        Remove Product
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  delete: product => dispatch(deleteProduct(product))
});

const ManageSingleProduct = connect(null, mapDispatchToProps)(
  UnconnectedManageSingleProduct
);

export default ManageSingleProduct;
