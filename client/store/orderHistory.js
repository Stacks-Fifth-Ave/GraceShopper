import axios from 'axios';

const GET_ORDERS = 'GET_ORDERS';

const defaultOrders = {orders: []};

const gotOrders = orders => ({type: GET_ORDERS, orders});

export const getOrders = () => async dispatch => {
  const {data} = await axios.get('/auth/me');
  const userId = data.id || 0;
  if (userId) {
    const orders = await axios.get(`/api/cart/orders/${userId}`).data;
    dispatch(gotOrders(orders));
  }
};

export default function(orders = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {...orders, orders: [...action.orders]};
    default:
      return orders;
  }
}
