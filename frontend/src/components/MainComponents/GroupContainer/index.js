import { useHistory } from 'react-router-dom';
import TodoContainer from '../TodoContainer';
import MessageBoardContainer from '../MessageBoardContainer';
import styles from './GroupContainer.module.css';

function GroupContainer({ groupObj, groupIdx }) {
  const history = useHistory();
  const redirectToGroup = () => {
    const path = `/groups/${groupIdx}`;
    history.push(path);
  }
  return (
    <div className={styles.group__container} onClick={redirectToGroup}>
      <h1 className={styles.group__title}>{groupObj.group.name}</h1>
      <div className={styles.content__container}>
        <TodoContainer groupIdx={groupIdx} />
        <MessageBoardContainer messageBoards={groupObj.messageBoards} messageReplies={groupObj.messageReplies}/>
      </div>
    </div>
  );
}

export default GroupContainer
