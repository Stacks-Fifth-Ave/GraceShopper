import axios from 'axios';

/**
 * ACTION TYPES
 */

const NEW_PRODUCT = 'ADD_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

/**
 * INITIAL STATE
 */

const defaultProducts = [];

/**
 * ACTION CREATORS
 */

const addedProduct = product => ({type: NEW_PRODUCT, product});
const deletedProduct = () => ({type: DELETE_PRODUCT});
const updatedProduct = product => ({type: UPDATE_PRODUCT, product});

/**
 * THUNK CREATORS
 */

export const addProduct = (product, newProductInfo) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/products/`, newProductInfo);
    dispatch(addedProduct(data));
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = product => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/products/${product.id}`);
    dispatch(deletedProduct(data));
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = (product, newProductInfo) => async dispatch => {
  try {
    const {data} = await axios.put(
      `/api/products/${product.id}`,
      newProductInfo
    );
    dispatch(updatedProduct(data));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function(products = defaultProducts, action) {
  switch (action.type) {
    case NEW_PRODUCT:
      return [...products, action.product];
    case DELETE_PRODUCT:
      return {
        products: [
          products.filter(product => product.info.id !== action.product.info.id)
        ]
      };
    case UPDATE_PRODUCT:
      return [...products, action.product];
    default:
      return products;
  }
}
