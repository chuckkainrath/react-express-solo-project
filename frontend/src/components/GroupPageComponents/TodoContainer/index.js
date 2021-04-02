import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TodoTasks from '../TodoTasks';
import styles from './TodoContainer.module.css';

function TodoContainer() {
  const { groupIdx } = useParams();
  const todoGroups = useSelector(state => state.group.todoGroups[groupIdx]);
  const todoTasks = useSelector(state => state.group.todoItems[groupIdx]);

  return (
    <div className={styles.todo__container}>
      <h1 className={styles.title}>Todo List</h1>
      <div className={styles.content__container}>
        {todoGroups.map((group, idx) => {
          return <TodoTasks key={idx} taskGroup={group.title}>{todoTasks[idx]}</TodoTasks>
        })}
      </div>
    </div>
  );
}

export default TodoContainer;
