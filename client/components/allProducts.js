import React from 'react';
import axios from 'axios';

class allProducts extends React.Component {
  constructor() {
    super();
    this.products = [];
  }

  componentDidMount() {
    const {data} = axios.get('/api/products');
    this.products = data;
  }

  render() {
    console.log('products', this.products);
    return (
      <div>
        {this.products ? this.products.map(product => 'product') : 'loading'}
      </div>
    );
  }
}

export default allProducts;
