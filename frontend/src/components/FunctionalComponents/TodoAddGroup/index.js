import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTodoGroup } from '../../../store/group';
import styles from './TodoAddGroup.module.css';

function TodoAddGroup() {
  const { groupIdx } = useParams();
  const dispatch = useDispatch();
  const group = useSelector(state => state.group.groups[groupIdx]);

  const [title, setTitle] = useState('');
  const [btnEnabled, setBtnEnabled] = useState(true);

  const inputChange = e => {
    const input = e.target.value;
    if (input.length === 0 || input.length >= 50) {
      setBtnEnabled(true);
    } else {
      setBtnEnabled(false);
    }
    setTitle(e.target.value);
  }

  const submitGroup = () => {
    dispatch(addTodoGroup({title, groupId: group.id, groupIdx}));
    setTitle('');
  }

  return (
    <div className={styles.add_group}>
      <h1 className={styles.title}>Add a New Group</h1>
      <input
        name='add-group'
        value={title}
        onChange={inputChange}
        placeholder='Add Todo Group...'
      />
      <button disabled={btnEnabled} onClick={submitGroup}>Add Todo Group</button>
    </div>
  );
}

export default TodoAddGroup;
