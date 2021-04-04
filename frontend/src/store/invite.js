import { csrfFetch } from './csrf';
import { flattenGroups } from './utils';
import cloneDeep from 'clone-deep';

const GET_INV = 'GET_INV';
const REMOVE_INV = 'REMOVE_INV';

const getInvitesAction = invites => ({
  type: GET_INV,
  invites
});

const removeInviteAction = inviteIdx => ({
  type: REMOVE_INV,
  inviteIdx
});

export const processInvite = ({accept, inviteId, inviteIdx}) => async dispatch => {
  const options = {
    method: 'DELETE',
    body: JSON.stringify({ acceptInvite: accept })
  }
  const res = await csrfFetch(`/api/invites/${inviteId}`, options);

  dispatch(removeInviteAction(inviteIdx));

  if (accept) {
    return (await res.json()).groupData;
  }
}

export const getInvites = () => async dispatch => {
  const res = await csrfFetch('/api/invites');
  const invRes = await res.json();
  const invites = invRes.invites.map(inv => {
    return {
      id: inv.id,
      userId: inv.userId,
      groupId: inv.groupId,
      groupName: inv.Group.name
    }
  });
  dispatch(getInvitesAction(invites));
}

export const sendInvite = ({credential, groupId}) => async () => {
  let email, username;
  if (credential.includes('@')) email = credential;
  else username = credential;
  const options = {
    method: 'POST',
    body: JSON.stringify({email, username, groupId})
  }
  await csrfFetch('/api/invites', options);
}

const initialState = {
  invites: {}
};

const inviteReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_INV:
      newState = {invites: action.invites};
      return newState;
    case REMOVE_INV:
      newState = cloneDeep(state);
      newState.invites.splice(action.inviteIdx, 1);
      return newState;
    default:
      return state;
  }
}

export default inviteReducer;
