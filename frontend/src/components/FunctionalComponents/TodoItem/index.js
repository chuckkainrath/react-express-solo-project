import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTodoTask, deleteTask } from '../../../store/group';
import styles from './TodoItem.module.css';

function TodoItem({item}) {
  const dispatch = useDispatch();
  const { groupIdx } = useParams();
  const [ completed, setCompleted ] = useState(item.completed);

  const completeClicked = () => {
    dispatch(editTodoTask({task: item, groupIdx, completed: !completed}));
    setCompleted(!completed);
  }

  const deleteItem = () => {
    dispatch(deleteTask({task: item, groupIdx}));
  }

  return (
    <li className={styles.todo__item}>
      {/* <input
        type='checkbox'
        value={completed ? 'complete' : 'in-progress'}
        checked={completed}
        onChange={completeClicked}
      /> */}
      <div className={styles.task__options}>
        <i onClick={deleteItem} class="fas fa-trash-alt"></i>
        {completed && <i class="fal fa-check-square" onClick={completeClicked}></i>}
        {!completed && <i class="fal fa-square" onClick={completeClicked}></i>}
      </div>
      <div className={styles.task}>{item.task}</div>
    </li>
  )
}

export default TodoItem;
