import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getGroups } from '../../../store/group';
import GroupContainer from '../GroupContainer';

const wrapGroup = (allGroups, idx) => {
  return {
    group: allGroups.groups[idx],
    schedule: allGroups.schedules[idx],
    todoGroups: allGroups.todoGroups[idx],
    todoItems: allGroups.todoItems[idx],
    messageBoards: allGroups.messageBoards[idx],
    messageReplies: allGroups.messageReplies[idx],
  };
}

function GroupsWrapper() {
  const dispatch = useDispatch();
  const groupsObj = useSelector(state => state.group);
  const groups = groupsObj.groups;

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  return (
    <div className='groups__container'>
      {groups.map((_, idx) => {
        return <GroupContainer key={idx} groupIdx={idx} groupObj={wrapGroup(groupsObj, idx)} />
      })}
    </div>
  );
}

export default GroupsWrapper;
