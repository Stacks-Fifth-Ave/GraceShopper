import React from 'react';
import {connect} from 'react-redux';

const Cart = props => {
  return (
    <div>
      {props.items.map(item => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <h2>{item.price}</h2>
        </div>
      ))}
    </div>
  );
};
//map state to props to get cart info from store
const mapStateToProps = state => {
  return {
    items: state.cart.items
  };
};
//map dispatch to props to remove items from cart
// const mapDispatchToProps = (dispatch) => {
//   return {
//     removeItem: dispatch(removeItem)
//   }
// }

export default connect(mapStateToProps)(Cart);
