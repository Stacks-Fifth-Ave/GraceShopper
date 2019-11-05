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
const defaultCart = {products: []};

/**
 * ACTION CREATORS
 */
const addedProduct = product => ({type: ADD_PRODUCT, product});
export const removeProduct = productId => ({type: REMOVE_PRODUCT, productId});

/**
 * THUNK CREATORS
 */
export const addProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`);
    dispatch(addedProduct(res.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(cart = defaultCart, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {...cart, products: [...cart.products, action.product]};
    case REMOVE_PRODUCT:
      return {
        ...cart,
        products: cart.products.filter(
          product => product.id !== action.productId
        )
      };
    default:
      return cart;
  }
}
