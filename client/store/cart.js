import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';

/**
 * INITIAL STATE
 */
let defaultCart = {products: [], cartHistory: []};

/**
 * ACTION CREATORS
 */
export const addedProduct = product => ({type: ADD_PRODUCT, product});
export const removedProduct = product => ({type: REMOVE_PRODUCT, product});
export const clearedProducts = () => ({type: CLEAR_PRODUCTS});

/**
 * THUNK CREATORS
 */

export const addProduct = product => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me');
    const userId = data.id || 0;
    if (userId) await axios.put(`/api/cart/addProduct/${userId}`);
    dispatch(addedProduct(product));
  } catch (err) {
    console.error(err);
  }
};

export const removeProduct = product => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me');
    const userId = data.id || 0;
    if (userId) await axios.put(`/api/cart/removeProduct/${userId}`);
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

export const getCart = async () => {
  const {data} = await axios.get('/auth/me');
  const userId = data.id || 0;
  if (userId) {
    const cart = axios.get(`/api/cart/${userId}`).data;
    defaultCart = cart;
  } else {
    defaultCart = window.Storage.cart;
  }
};

export const getCartHistory = async () => {
  const {data} = await axios.get('auth/me');
  const userId = data.id || 0;
  if (userId) {
    const cartHistory = await axios.get(`/api/cart/cartHistory/${userId}`).data;
    defaultCart.cartHistory = [...cartHistory];
  }
};

/**
 * REDUCER
 */
export default function(cart = defaultCart, action) {
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
    default:
      return cart;
  }
}
