import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OptionsBar from '../OptionsBar';
import TodoContainer from '../TodoContainer';
import MessageBoardContainer from '../MessageBoardContainer';

function GroupPage() {
  const { groupIdx } = useParams();
  const group = useSelector(state => state.group.groups[groupIdx]);

  return (
    <div className='group__container'>
      <OptionsBar />
      <h1>{group.name}</h1>
      <div className='content__container'>
        <TodoContainer />
        <MessageBoardContainer />
      </div>
    </div>
  );
}

export default GroupPage;
