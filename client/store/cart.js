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
const defaultCart = {itemIds: []}

/**
 * ACTION CREATORS
 */
const addItem = itemId => ({type: ADD_ITEM, itemId})
const removeItem = itemId => ({type: REMOVE_ITEM, itemId})

/**
 * THUNK CREATORS
 */
export const item = itemId => async dispatch => {
  try {
    const res = await axios.get('/api/items/${itemId}')
    dispatch(addItem(res.data.itemId))
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
      return {...cart, itemIds: [...itemIds, action.itemId]}
    case REMOVE_ITEM:
      return {
        ...cart,
        itemIds: cart.itemIds.filter(item => item.id !== action.itemId)
      }
    default:
      return state
  }
}
