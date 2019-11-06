import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

/**
 * INITIAL STATE
 */
let defaultCart = {products: []};

/**
 * ACTION CREATORS
 */
export const addedProduct = product => ({type: ADD_PRODUCT, product});
export const removedProduct = product => ({type: REMOVE_PRODUCT, product});

/**
 * THUNK CREATORS
 */

export const addProduct = product => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me');
    const userId = data.id || 0;
    await axios.put(`/api/cart/addProduct/${userId}`);
    dispatch(addedProduct(product));
  } catch (err) {
    console.error(err);
  }
};

export const removeProduct = product => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me');
    const userId = data.id || 0;
    await axios.put(`/api/cart/removeProduct/${userId}`);
    dispatch(removedProduct(product));
  } catch (err) {
    console.error(err);
  }
};

export const getCart = async () => {
  const {data} = await axios.get('/auth/me');
  const userId = data.id || 0;
  if (userId === data.id) {
    const cart = axios.get(`/api/cart/${userId}`).data;
    defaultCart = cart;
  } else {
    defaultCart = window.Storage.cart;
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

      console.log('updated, ', updatedProducts);
      if (exists) {
        return {...cart, products: [...updatedProducts]};
      }

      if (!exists) {
        return {...cart, products: [...cart.products, product]};
      }

    case REMOVE_PRODUCT:
      return {
        ...cart,
        products: cart.products.filter(
          product => product.info.id !== action.product.info.id
        )
      };
    default:
      return cart;
  }
}
