import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

/**
 * INITIAL STATE
 */
const defaultCart = {items: []}

/**
 * ACTION CREATORS
 */
const addedItem = item => ({type: ADD_ITEM, item})
const removeItem = itemId => ({type: REMOVE_ITEM, itemId})

/**
 * THUNK CREATORS
 */
export const addItem = itemId => async dispatch => {
  try {
    const res = await axios.get(`/api/items/${itemId}`)
    dispatch(addedItem(res.data.item))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(cart = defaultCart, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {...cart, items: [...cart.items, action.item]}
    case REMOVE_ITEM:
      return {
        ...cart,
        items: cart.items.filter(item => item.id !== action.itemId)
      }
    default:
      return cart
  }
}
