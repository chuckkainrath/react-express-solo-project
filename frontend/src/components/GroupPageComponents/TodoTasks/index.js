import styles from './TodoTasks.module.css';

function TodoTasks({ taskGroup, children }) {
  return (
    <div className={styles.task__container}>
      <h1 className={styles.task__group}>{taskGroup}</h1>
      <ul className={styles.task__list}>
        {children.length === 0 && (
          <li className={styles.task__none}>No tasks</li>
        )}
        {children.length > 0 &&  children.map(task => {
          return <li key={task.id}>- {task.task}</li>
        })}
      </ul>
    </div>
  );
}

export default TodoTasks;
