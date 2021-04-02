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
      <h1>Todo List</h1>
      {todoGroups.map((group, idx) => {
        return <TodoTasks key={idx} taskGroup={group.title}>{todoTasks[idx]}</TodoTasks>
      })}
    </div>
  );
}

export default TodoContainer;
