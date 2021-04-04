import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createMessage, editMessage } from '../../../store/group';
import { sendInvite } from '../../../store/invite';

function InviteComponent() {
  const dispatch = useDispatch();
  const { groupIdx } = useParams();
  const group = useSelector(state => state.group.groups[groupIdx]);
  const [showInv, toggleShowInv] = useState(false);
  const [submitInv, setSubmitInv] = useState(false);
  const [invitedUser, setInvitedUser] = useState('');

  const invChanged = e => {
    const newInv = e.target.value;
    if (newInv.length < 4 || newInv.length > 30) {
      setSubmitInv(false);
    } else {
      setSubmitInv(true);
    }
    setInvitedUser(newInv);
  }

  const sendInv = async () => {
    await dispatch(sendInvite({
      credential: invitedUser,
      groupId: group.id,
    }));
    toggleShowInv(false);
    setSubmitInv(false);
    setInvitedUser('');
  }

  return (
    <>
      <button
        // className={}
        onClick={() => toggleShowInv(!showInv)}>
          Invite User
      </button>
      {showInv && (
        <div>
          <h1>Username or email</h1>
          <input
            type='text'
            placeholder='Username or email...'
            value={invitedUser}
            onChange={invChanged} />
          <button  disabled={!submitInv} onClick={sendInv}>
            Send Invite
          </button>
        </div>
      )}
    </>
  );
}

export default InviteComponent;
