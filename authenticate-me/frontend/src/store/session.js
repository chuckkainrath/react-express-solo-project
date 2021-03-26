import { csrfFetch } from './csrf';

const SESSION_START = 'session/SET';
const SESSION_END = 'session/REMOVE';

const sessionStart = user => ({
  type: SESSION_START,
  user
});

const sessionEnd = () => ({
  type: SESSION_END
});

export const login = ({credential, password}) => async dispatch => {
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
  dispatch(sessionStart(resObj.user));
  return res;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SESSION_START:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case SESSION_END:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
}

export default sessionReducer;
