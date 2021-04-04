import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { processInvite } from '../../../store/invite';
import { insertGroup } from '../../../store/group';

function InviteDropdown({invites}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleInv = async (inviteIdx, accept, inviteId) => {
    const groupData = await dispatch(processInvite({accept, inviteIdx, inviteId}));
    if (accept) {
      await dispatch(insertGroup(groupData));
    }
  }

  return (
    <div>
      <ul>
        {invites && invites.map((inv, idx) => {
          return (
            <li key={idx}>
              <button onClick={() => handleInv(idx, true, inv.id)}>
                <i class="fal fa-check"></i>
              </button>
              <button onClick={() => handleInv(idx, false, inv.id)}>
                <i class="fal fa-times"></i>
              </button>
              <span>{inv.groupName}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default InviteDropdown;
