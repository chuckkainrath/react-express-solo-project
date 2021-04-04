import { useSelector } from 'react-redux';
import styles from './TodoContainer.module.css';


function TodoContainer({groupIdx}) {
  const todoGroups = useSelector(state => state.group.todoGroups[groupIdx]);
  const todoItems = useSelector(state => state.group.todoItems[groupIdx]);

  return (
    <div className={styles.todo__container}>
      <h1 className={styles.title}>Todo List</h1>
      <div className={styles.tasks__container}>
        {todoGroups && todoGroups.map((todoGroup, idx) => {
          return (
            <div key={todoGroup.id} className={styles.content__container}>
              <h2 className={styles.content__title}>{todoGroup.title}</h2>
              <ul className={styles.content__list}>
                {todoItems[idx].length === 0 && (
                  <li className={styles.tasks__none}>No tasks</li>
                )}
                {todoItems[idx].map(task => {
                  return <li key={task.id}>{task.task}</li>
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default TodoContainer;
