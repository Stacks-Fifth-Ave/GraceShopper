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
export const addPruduct = product => ({type: ADD_PRODUCT, product});
export const removePruduct = product => ({type: REMOVE_PRODUCT, product});

/**
 * THUNK CREATORS
 */

//this thunk creater should add product to both backend and fontend cart
export const addProduct = product => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me');
    const userId = data.id || 0;
    await axios.update(`/api/cart/addProduct/${userId}`);
    dispatch(addProduct(product));
  } catch (err) {
    console.error(err);
  }
};

//this thunk creater should remove product to both backend and fontend cart
export const removeProduct = product => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me');
    const userId = data.id || 0;
    await axios.update(`/api/cart/removeProduct/${userId}`);
    dispatch(removeProduct(product));
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
