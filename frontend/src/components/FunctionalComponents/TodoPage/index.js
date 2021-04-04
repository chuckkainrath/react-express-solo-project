import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OptionsBar from '../../GroupPageComponents/OptionsBar';
import TodoGroupContainer from '../TodoGroupContainer';
import TodoAddGroup from '../TodoAddGroup';
import styles from './TodoPage.module.css';

function TodoPage() {
  const { groupIdx } = useParams();
  const todoGroups = useSelector(state => state.group.todoGroups[groupIdx]);

  return (
    <div className={styles.page__container}>
      <OptionsBar />
      <div className={styles.todo_page__container}>
        <h1 className={styles.title}>Todo List</h1>
        <div className={styles.container}>
          {todoGroups.map((group, idx) => {
            return <TodoGroupContainer key={group.id} todoGroupIdx={idx} />
          })}
        </div>
        <TodoAddGroup />
      </div>
    </div>
  );
}

export default TodoPage;
