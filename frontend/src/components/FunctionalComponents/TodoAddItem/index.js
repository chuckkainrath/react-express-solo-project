import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addTodoTask } from '../../../store/group';
import styles from './TodoAddItem.module.css';

function TodoAddItem({todoGroupId, groupId}) {
  const { groupIdx } = useParams();
  const dispatch = useDispatch();

  const [task, setTask] = useState('');
  const [btnDisable, setBtnDisable] = useState(true);

  const inputChange = (e) => {
    const input = e.target.value;
    if (input.length === 0 || input.length >= 100) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
    setTask(input);
  }

  const submitTask = () => {
    dispatch(addTodoTask({task, groupIdx, todoGroupId, groupId}));
    setTask('');
  }

  return (
    <div className={styles.todo_item__add}>
      <input
      name='add-item'
      value={task}
      placeholder='Add task...'
      onChange={inputChange} />
      <button disabled={btnDisable} onClick={submitTask}>Add Task</button>
    </div>
  );
}

export default TodoAddItem;
