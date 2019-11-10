import React from 'react';
import axios from 'axios';
import SingleProduct from './SingleProduct';

class allProducts extends React.Component {
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
      <div className="row">
        {this.state.products.map(product => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

export default allProducts;
