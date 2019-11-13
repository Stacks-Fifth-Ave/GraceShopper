import React from 'react';
import axios from 'axios';
import ManageSingleProduct from './ManageSingleProduct';

class ManageAllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/products');
    this.setState({
      products: data
    });
  }

  render() {
    return (
      <div>
        <h1>All Products</h1>
        {this.state.products.map(product => (
          <ManageSingleProduct key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

export default ManageAllProducts;
