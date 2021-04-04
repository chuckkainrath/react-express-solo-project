import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TodoAddItem from '../TodoAddItem';
import TodoItem from '../TodoItem';
import { deleteTaskGroup } from '../../../store/group';
import styles from './TodoGroupContainer.module.css';

function TodoGroupContainer({ todoGroupIdx }) {
  const dispatch = useDispatch();
  const { groupIdx } = useParams();
  const todoGroup = useSelector(state => state.group.todoGroups[groupIdx][todoGroupIdx]);
  const todoItems = useSelector(state => state.group.todoItems[groupIdx][todoGroupIdx]);

  const deleteGroup = () => {
    dispatch(deleteTaskGroup({taskGroupId: todoGroup.id, groupIdx}));
  }

  return (
    <div className={styles.group__container}>
      <h1 className={styles.title}>{todoGroup.title}</h1>
      <ul className='item__container'>
        {todoItems.map((item, idx) => {
          return <TodoItem item={item} key={item.id} />
        })}
      </ul>
      <TodoAddItem todoGroupId={todoGroup.id} groupId={todoGroup.groupId} />
      <button className={styles.delete} onClick={deleteGroup}>Delete Group</button>
    </div>
  );
}

export default TodoGroupContainer;
