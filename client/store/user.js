import axios from 'axios';
import history from '../history';
import {clearProducts} from './cart';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const DELETE_USER = 'DELETE_USER';

/**
 * INITIAL STATE
 */
const initialState = {
  defaultUser: {},
  selectedUser: {}
};

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});
const deletedUser = user => ({type: DELETE_USER, user});

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || initialState.defaultUser));
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

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return initialState.defaultUser;
    case DELETE_USER:
      console.log('ACTION.USER', action);
      console.log('STATE', state);
      if (action.user !== state.selectedUser) {
        return {...state};
      } else {
        return initialState.defaultUser;
      }

    default:
      return state;
  }
}
