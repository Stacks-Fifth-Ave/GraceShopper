import React from 'react';
import axios from 'axios';

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
    console.log(this.state);
    return (
      <div>
        {this.state.products
          ? this.state.products.map(product => (
              <div key={product.id}>'product'</div>
            ))
          : 'loading'}
      </div>
    );
  }
}

export default allProducts;
