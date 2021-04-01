
function TodoTasks({ taskGroup, children }) {
  return (
    <div className='task__group'>
      <h1>{taskGroup}</h1>
      <ul>
        {children.map(task => {
          return <li key={task.id}>{task.task}</li>
        })}
      </ul>
    </div>
  );
}

export default TodoTasks;
