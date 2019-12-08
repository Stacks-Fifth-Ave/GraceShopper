import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {removeProduct, getCart, clearProducts, addTotal} from '../store/cart';
import {centsToDollarString, DEFAULT_CURRENCY} from '../formatters.js';
import {ToastProvider, useToasts} from 'react-toast-notifications';

const DisconnectedCartWithToast = props => {
  getCart();
  const calculateTotal = () => {
    const total = props.products.reduce((total, product) => {
      total += product.info.price * product.quantity;
      return total;
    }, 0);
    props.addTotal(total);
    return total;
  };
  const {addToast} = useToasts();
  const removeFromCart = async value => {
    addToast(`${value.info.name} removed from cart`, {
      appearance: 'success',
      autoDismiss: true
    });
    props.remove(value);
  };

  if (props.products.length === 0) {
    return (
      <div>
        <h2>Cart is empty</h2>
      </div>
    );
  }
  return (
    <div className="container">
      {props.products.map(product => (
        <div className="card horizontal" key={product.info.id}>
          <div className="card-image col">
            <img className="single-product-image" src={product.info.image} />
          </div>
          <div className="card-stacked col">
            <div className="card-content">
              {product.info.name}
              <br />Quantity: {product.quantity}
              <br />Cost per item{' '}
              {centsToDollarString(product.info.price, DEFAULT_CURRENCY)}
              <br />
              Total cost:{' '}
              {centsToDollarString(
                product.info.price * product.quantity,
                DEFAULT_CURRENCY
              )}
            </div>
            <div className="card-action center">
              <button
                className="waves-effect waves-light btn-large"
                onClick={() => removeFromCart(product)}
                type="submit"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="foot center">
        <h2>
          Total: {centsToDollarString(calculateTotal(), DEFAULT_CURRENCY)}
        </h2>
        <div className="card-action center">
          <Link to="/checkout">
            <button
              className="waves-effect waves-light btn-large"
              type="submit"
            >
              checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

//map state to props to get cart info from store
const mapStateToProps = state => {
  return {
    products: state.cart.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    remove: product => dispatch(removeProduct(product)),
    clear: () => dispatch(clearProducts()),
    getCart: dispatch(getCart()),
    addTotal: total => dispatch(addTotal(total))
  };
};

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCartWithToast
);

export const Cart = props => (
  <ToastProvider>
    <ConnectedCart props={props} />
  </ToastProvider>
);
