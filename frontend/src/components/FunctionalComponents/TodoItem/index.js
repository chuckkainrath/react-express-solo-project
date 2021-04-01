import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTodoTask, deleteTask } from '../../../store/group';

function TodoItem({item}) {
  const dispatch = useDispatch();
  const { groupIdx } = useParams();
  const [ completed, setCompleted ] = useState(item.completed);

  const completeClicked = e => {
    const complete = !(e.target.value === 'complete');
    setCompleted(complete);
    dispatch(editTodoTask({task: item, groupIdx, completed: complete}));
  }

  const deleteItem = () => {
    dispatch(deleteTask({task: item, groupIdx}));
  }

  return (
    <li>
      <input
        type='checkbox'
        value={completed ? 'complete' : 'in-progress'}
        checked={completed}
        onChange={completeClicked}
      />
      <button onClick={deleteItem}>Delete</button>
      {item.task}
    </li>
  )
}

export default TodoItem;
