import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getGroups } from '../../../store/group';
import { Modal } from '../../../context/Modal';
import LoginForm from '../../LoginFormModal/LoginForm';
import GroupContainer from '../GroupContainer';
import styles from './GroupsWrapper.module.css';
import projectImage from './project.png';

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
  const history = useHistory();
  const groupsObj = useSelector(state => state.group);
  const user = useSelector(state => state.session.user);
  const groups = groupsObj.groups;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  return (
    <>
      {!user && (
        <div className={styles.unauthorized}>
          <h1>Welcome to Nexus, a group project management application</h1>
          <h1>
            <span tabindex='1' className={styles.authorize} onClick={() => setShowModal(true)}>Login</span>
            {'  '}or{'  '}
            <span tabindex='1' onClick={() => history.push('/signup')} className={styles.authorize}>Signup</span> to start accessing groups
          </h1>
          <img src={projectImage} />
          {showModal && (
            <Modal onClose={() => setShowModal(false) }>
              <LoginForm />
            </Modal>
          )}
        </div>
      )}
      {user && groups.length === 0 && (
        <h1 className={styles.no_group}>Create a group or get invited to a group to get started</h1>
      )}
      {user && (
      <div className={styles.groups__container}>
        {groups.map((_, idx) => {
          return <GroupContainer key={idx} groupIdx={idx} groupObj={wrapGroup(groupsObj, idx)} />
        })}
      </div>
      )}
    </>
  );
}

export default GroupsWrapper;
