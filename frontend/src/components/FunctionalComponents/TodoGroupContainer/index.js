import React, { useState, useEffect, useRef } from 'react';
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
  const [ totalItems, setTotalItems ] = useState(0);
  const [ completedItems, setCompletedItems ] = useState(0);
  const completedRef = useRef(null);

  const deleteGroup = () => {
    dispatch(deleteTaskGroup({taskGroupId: todoGroup.id, groupIdx}));
  }

  useEffect(() => {
    let completed = 0;
    todoItems.forEach(itm => {
      if (itm.completed) completed++;
    });
    setTotalItems(todoItems.length);
    setCompletedItems(completed);
    if (completedRef && completed === todoItems.length && completed > 0) {
      completedRef.current.classList.add(styles.completed__all);
    } else if (completedRef) {
      completedRef.current.classList.remove(styles.completed__all);
    }
  }, [todoItems]);


  return (
    <div className={styles.group__container}>
      <h1 className={styles.title}>{todoGroup.title}</h1>
      <h2 ref={completedRef} className={styles.completed}>Progress: {completedItems} / {totalItems}</h2>
      <div className={styles.todo__flex}>
        <ul className={styles.items__container}>
          {todoItems.map((item, idx) => {
            return <TodoItem item={item} key={item.id} />
          })}
        </ul>
        <div>
          <TodoAddItem todoGroupId={todoGroup.id} groupId={todoGroup.groupId} />
          <button className={styles.delete} onClick={deleteGroup}>Delete Group</button>
        </div>
      </div>
    </div>
  );
}

export default TodoGroupContainer;
