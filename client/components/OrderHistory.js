import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getOrders} from '../store/orderHistory';

class DisconnectedOrderHistory extends React.Component {
  componentDidMount() {
    getOrders();
  }
  render() {
    console.log(this.props.orders);
    if (!this.props.orders.length) {
      return (
        <div>
          <h1>No cart history. Order something!</h1>
        </div>
      );
    }
    return <div>{this.props.orders.map(order => order.id)}</div>;
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
