import { useHistory } from 'react-router-dom';
import TodoContainer from '../TodoContainer';
import MessageBoardContainer from '../MessageBoardContainer';

function GroupContainer({ groupObj, groupIdx }) {
  const history = useHistory();
  const redirectToGroup = () => {
    const path = `/groups/${groupIdx}`;
    history.push(path);
  }
  return (
    <div className='group__container' onClick={redirectToGroup}>
      <h1>{groupObj.group.name}</h1>
      <TodoContainer todoGroups={groupObj.todoGroups} todoItems={groupObj.todoItems} />
      <MessageBoardContainer messageBoards={groupObj.messageBoards} messageReplies={groupObj.messageReplies}/>
    </div>
  );
}

export default GroupContainer
