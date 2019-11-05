import React from 'react';

const SingleProduct = props => {
  return (
    <div className="single-product">
      <h1>{props.product.name}</h1>
      <img src={props.product.image} />
      <p>{props.product.description}</p>
      <p>{props.product.price}</p>
      <button type="submit">Add to Cart</button>
    </div>
  );
};

export default SingleProduct;
