import { csrfFetch } from './csrf';

const SESSION_SET = 'session/SET';
const SESSION_REMOVE = 'session/REMOVE';

const sessionSet = user => ({
  type: SESSION_SET,
  user
});

export const sessionStart = ({credential, password}) => async dispatch => {
  const url = '/api/session';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({credential, password})
  }
  const res = await csrfFetch(url, options);
  const resObj = await res.json();
  dispatch(sessionSet(resObj.user));
}

export const sessionRemove = () => ({
  type: SESSION_REMOVE
});

const initialState = { user: null };

export const sessionReducer = (state = initialState, action) => {
  console.log('at session reducer');
  switch (action.type) {
    case SESSION_SET:
      return {...state, user: action.user }
    case SESSION_REMOVE:
      return initialState;
    default:
      return {...state}
  }
}
