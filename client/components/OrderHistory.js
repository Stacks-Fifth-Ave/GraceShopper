import React from 'react';
import {connect} from 'react-redux';
import {getOrders} from '../store/orderHistory';
import SingleProduct from './SingleProduct';
import {centsToDollarString, DEFAULT_CURRENCY} from '../formatters.js';

class DisconnectedOrderHistory extends React.Component {
  componentDidMount() {
    this.props.getOrders();
  }
  render() {
    // console.log(this.props.orders);
    if (!this.props.orders.length) {
      return (
        <div>
          <h1>No cart history. Order something!</h1>
        </div>
      );
    }
    let orderNum = 1;
    return (
      <div>
        {this.props.orders.map(order => (
          <div key={order.id} className="card">
            <p>Order #{orderNum++}</p>
            {order.products.map(product => (
              <div key={product.id}>
                <div className="row">
                  name: {product.name}
                  <br />
                  price: {centsToDollarString(product.price, DEFAULT_CURRENCY)}
                  <br />
                  quantity: {product.CartProduct.quantity} <br />
                  total price:{' '}
                  {centsToDollarString(
                    product.price * product.CartProduct.quantity,
                    DEFAULT_CURRENCY
                  )}
                  <br />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orderHistory.orders
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders())
  };
};

const OrderHistory = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedOrderHistory
);
export default OrderHistory;
