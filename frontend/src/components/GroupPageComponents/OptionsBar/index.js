import { NavLink, useParams } from 'react-router-dom';

function OptionsBar() {
  const { groupIdx } = useParams();
  return (
    <div className='options-bar'>
      <NavLink to={`/groups/${groupIdx}`}>Group Home</NavLink>
      <NavLink to={`/groups/${groupIdx}/message-board`}>Message Board</NavLink>
      <NavLink to={`/groups/${groupIdx}/todo-list`}>Todo List</NavLink>
      <NavLink to={`/groups/${groupIdx}/schedule`}>Schedule</NavLink>
    </div>
  );
}

export default OptionsBar;
