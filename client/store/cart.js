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
export const addProduct = product => ({type: ADD_PRODUCT, product});
export const removeProduct = product => ({type: REMOVE_PRODUCT, product});

/**
 * THUNK CREATORS
 */
// export const addProduct = productId => async dispatch => {
//   try {
//     const res = await axios.get(`/api/products/${productId}`);
//     dispatch(addedProduct(res.data));
//   } catch (err) {
//     console.error(err);
//   }
// };

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
        } else {return currProduct;}
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
