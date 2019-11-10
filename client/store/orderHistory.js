import axios from 'axios';

const GET_ORDERS = 'GET_ORDERS';

const defaultOrders = {orders: []};

const gotOrders = orders => ({type: GET_ORDERS, orders});

export const getOrders = () => {
  return async dispatch => {
    try {
      const req = await axios.get('/auth/me');
      const userId = req.data.id;
      if (userId) {
        const {data} = await axios.get(`/api/cart/orders/${userId}`);
        console.log('thunk function axios order req', data);
        dispatch(gotOrders(data));
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export default function(orders = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {...orders, orders: action.orders};
    default:
      return orders;
  }
}
