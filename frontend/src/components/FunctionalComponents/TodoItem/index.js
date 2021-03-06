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
      <div className={styles.task__options}>
        <span className={styles.garbage}><i onClick={deleteItem} class="fas fa-trash-alt"></i></span>
        {completed && <span className={styles.complete}><i class="fal fa-check-square" onClick={completeClicked}></i></span>}
        {!completed && <span className={styles.incomplete}><i class="fal fa-square" onClick={completeClicked}></i></span>}
      </div>
      <div className={styles.task}>{item.task}</div>
    </li>
  )
}

export default TodoItem;
