import axios from 'axios';
import history from '../history';
import store from './index';
import {runInNewContext} from 'vm';

/**
 * ACTION TYPES
 */
const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';
const PAYMENT_SUCCESS = 'PAYMENT_SUCESS';
const LOAD_CART = 'LOAD_CART';

/**
 * INITIAL STATE
 */
let defaultCart = {products: [], paid: false};

/**
 * ACTION CREATORS
 */
export const addedProduct = product => ({type: ADD_PRODUCT, product});
export const removedProduct = product => ({type: REMOVE_PRODUCT, product});
export const clearedProducts = () => ({type: CLEAR_PRODUCTS});
export const paymentSuccessed = () => ({type: PAYMENT_SUCCESS});
export const gotCart = products => ({type: LOAD_CART, products});

/**
 * THUNK CREATORS
 */

export const addProduct = product => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me');
    const userId = data.id || 0;
    if (userId) await axios.put(`/api/cart/addProduct/${userId}`, {productId: product.id});
    dispatch(addedProduct(product));
  } catch (err) {
    console.error(err);
  }
};

export const removeProduct = product => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me');
    const userId = data.id || 0;
    if (userId) {
      await axios.put(`/api/cart/removeProduct/${userId}`, {
        productId: product.info.id
      });
    }
    dispatch(removedProduct(product));
  } catch (err) {
    console.error(err);
  }
};

export const clearProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me');
    const userId = data.id;
    if (userId) await axios.delete(`/api/cart/clearCart/${userId}`);
    dispatch(clearedProducts());
  } catch (error) {
    console.error(error);
  }
};

export const getCart = () => async dispatch => {
  const {data} = await axios.get('/auth/me');
  const userId = data.id || 0;
  //get backend cart when a user is logged in
  if (userId) {
    const {data} = await axios.get(`/api/cart/${userId}`);
    dispatch(gotCart(data.products));
    //get from storage if user is not logged in and state is empty (ex, on refresh)
    //does not actually work yet
  } else if (!userId && store.getState().cart.products.length) {
    defaultCart = window.Storage.cart;
  }
};

export const paymentSuccess = () => {
  store.dispatch(paymentSuccessed());
};

/**
 * REDUCER
 */
export default function(cart = {products: [], paid: false}, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      const product = {info: action.product, quantity: 1};
      let exists = false;
      const updatedProducts = cart.products.map(currProduct => {
        if (currProduct.info.id === product.info.id) {
          exists = true;
          currProduct.quantity++;
          return currProduct;
        } else {
          return currProduct;
        }
      });

      if (exists) {
        return {...cart, products: [...updatedProducts]};
      }

      if (!exists) {
        return {...cart, products: [...cart.products, product]};
      }

    //remove will check product quantity before removing. If quantity is greater than one, will update quantity and return new store
    //else, there is only one left and will remove product from cart entirely
    // eslint-disable-next-line no-fallthrough
    case REMOVE_PRODUCT:
      if (action.product.quantity > 1) {
        const updatedProduct = {
          info: action.product.info,
          quantity: action.product.quantity - 1
        };
        return {
          ...cart,
          products: cart.products.map(product => {
            if (product.info.id !== action.product.info.id) {
              return product;
            } else {
              return updatedProduct;
            }
          })
        };
      } else {
        return {
          ...cart,
          products: cart.products.filter(
            product => product.info.id !== action.product.info.id
          )
        };
      }
    case CLEAR_PRODUCTS:
      return {...cart, products: []};
    case PAYMENT_SUCCESS:
      return {...cart, paid: true};
    case LOAD_CART:
      return {...cart, products: action.products};
    default:
      return cart;
  }
}
