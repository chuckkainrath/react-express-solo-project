import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { processInvite } from '../../../store/invite';
import { insertGroup } from '../../../store/group';

function InviteDropdown({invites}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const groups = useSelector(state => state.group.groups);
  const user = useSelector(state => state.session.user);
  const handleInv = async (inviteIdx, accept, inviteId) => {
    const groupData = await dispatch(processInvite({accept, inviteIdx, inviteId}));
    if (accept) {
      await dispatch(insertGroup(groupData));
      history.push(`/groups/${groups.length}`);
    }
  }

  return (
    <div className='inv__div'>
      <ul className='inv__list'>
        {user && invites && invites.map((inv, idx) => {
          return (
            <li key={idx}>
              <span>{inv.groupName}</span>
              <div className='inv-btn__container'>
                <button onClick={() => handleInv(idx, true, inv.id)}>
                  <i class="inv__accept fal fa-check"></i>
                </button>
                <button className='inv__decline' onClick={() => handleInv(idx, false, inv.id)}>
                  <i class="inv__decline fal fa-times"></i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default InviteDropdown;
