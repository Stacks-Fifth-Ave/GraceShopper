import axios from 'axios';
import history from '../history';
import {clearProducts, getCart} from './cart';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const DELETE_USER = 'DELETE_USER';
const UPDATE_USER = 'UPDATE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});
const deletedUser = user => ({type: DELETE_USER, user});
const updatedUser = user => ({type: UPDATE_USER, user});

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, {email, password});
  } catch (authError) {
    return dispatch(getUser({error: authError}));
  }

  try {
    dispatch(getUser(res.data));
    dispatch(getCart());
    history.push('/home');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    dispatch(clearProducts());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = user => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/users/${user.id}`);
    dispatch(deletedUser(data));
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = (user, newUserInfo) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${user.id}`, newUserInfo);
    dispatch(updatedUser(data));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function(user = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_USER:
      return action.user;
    default:
      return user;
  }
}
