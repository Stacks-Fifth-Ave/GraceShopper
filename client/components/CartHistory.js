import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCartHistory} from '../store/cart';

class DisconnectedCartHistory extends React.Component {
  componentDidMount() {
    getCartHistory();
  }
  render() {
    // console.log(this.props.cartHistory);
    // if (!this.props.cartHistory.length){
    //   return <div><h1>No cart history. Order something!</h1></div>;
    // }
    return <div>{this.props.cartHistory}</div>;
  }
}

const mapStateToProps = state => {
  return {
    cartHistory: state.cart.cartHistory
  };
};

const CartHistory = connect(mapStateToProps, null)(DisconnectedCartHistory);
export default CartHistory;
