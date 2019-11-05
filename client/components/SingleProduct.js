import React from 'react';

const SingleProduct = props => {
  return (
    <div className="single-product">
      <h1>{props.name}</h1>
      <img src={props.image} />
      <p>{props.description}</p>
      <p>{props.price}</p>
      <button type="submit">Add to Cart</button>
    </div>
  );
};

export default SingleProduct;
