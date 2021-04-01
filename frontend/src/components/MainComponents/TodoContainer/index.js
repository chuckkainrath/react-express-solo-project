
function TodoContainer({todoGroups, todoItems}) {

  return (
    <div className='todo__container'>
      <h1>Todo List</h1>
      {todoGroups && todoGroups.map((todoGroup, idx) => {
        return (
          <div key={todoGroup.id} className='todo__group'>
            <div className='todo__group-header'>
              <div className='todo__group-title'>{todoGroup.title}</div>
              <div className='todo__group-completed'>{todoGroup.completed ? 'Completed' : 'In Progress'}</div>
            </div>
            <ul className='todo__tasks'>
              {todoItems[idx].map(task => {
                return <li key={task.id}>{task.task} {task.completed ? 'Done' : 'In Progress'}</li>
              })}
            </ul>
          </div>
        )
      })}
    </div>
  );
}

export default TodoContainer;
