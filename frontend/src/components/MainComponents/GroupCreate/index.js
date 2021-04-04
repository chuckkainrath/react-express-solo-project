import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createGroup } from '../../../store/group';

function GroupCreate({toggleCreateGrp}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('')
  const [btnDisable, setBtnDisable] = useState(true);
  const groups = useSelector(state => state.group.groups);

  const nameChange = e => {
    const newName = e.target.value;
    if (newName.length === 0 || newName.length > 100) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
    setName(newName);
  }

  const submitGroup = async () => {
    const groupLen = groups.length;
    await dispatch(createGroup({groupName: name}));
    toggleCreateGrp(false);
    history.push(`/groups/${groupLen}`);
  }

  return (
    <div className='create-group__container'>
      <input
        value={name}
        placeholder='Group name...'
        onChange={nameChange}
      />
      <button disabled={btnDisable} onClick={submitGroup}>Create Group</button>
    </div>
  );
}

export default GroupCreate;
