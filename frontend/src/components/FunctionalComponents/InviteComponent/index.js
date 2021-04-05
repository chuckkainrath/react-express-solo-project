import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createMessage, editMessage } from '../../../store/group';
import { sendInvite } from '../../../store/invite';
import styles from './InviteComponent.module.css';

function InviteComponent() {
  const dispatch = useDispatch();
  const { groupIdx } = useParams();
  const group = useSelector(state => state.group.groups[groupIdx]);
  const [showInv, toggleShowInv] = useState(false);
  const [submitInv, setSubmitInv] = useState(false);
  const [invitedUser, setInvitedUser] = useState('');
  const [inviteRes, setInviteRes] = useState('');

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
    const result = await dispatch(sendInvite({
      credential: invitedUser,
      groupId: group.id,
    }));
    if (result === 'User In Group') {
      setInviteRes('The User is already in this group');
    } else if (result === 'User Not Found') {
      setInviteRes('The User does not exist');
    } else if (result === 'Invite Sent') {
      setInviteRes('Invent Sent');
    }
    setTimeout(() => setInviteRes(''), 3000);
    toggleShowInv(false);
    setSubmitInv(false);
    setInvitedUser('');
  }

  return (
    <div className={styles.invite__container}>
      {inviteRes && <div className={styles.invite__result}>{inviteRes}</div>}
      <button
        className={styles.invite__button}
        onClick={() => toggleShowInv(!showInv)}>
          Invite User
      </button>
      {showInv && (
        <div className={styles.invite__dropdown}>
          <input
            type='text'
            placeholder='Username or email...'
            value={invitedUser}
            onChange={invChanged} />
          <button  disabled={!submitInv} onClick={sendInv}>
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default InviteComponent;
