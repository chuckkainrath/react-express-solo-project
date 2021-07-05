import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './MessageGlimpse.module.css';

function MessageGlimpse({ messageIdx }) {
  const history = useHistory();
  const { groupIdx } = useParams();
  const message = useSelector(state => state.group.messageBoards[groupIdx][messageIdx]);
  // const replies = useSelector(state => state.group.messageReplies[groupIdx][messageIdx]);

  return (
    <div onClick={() => history.push(`/groups/${groupIdx}/message-board/${messageIdx}`)} className={styles.msg__container}>
      <h1 className={styles.msg__title}>{message.title}</h1>
      <h2 className={styles.msg__user_content}>
        <span className={styles.msg__user}>{message.username} - </span>
        <span className={styles.msg__content}>{message.message}</span>
      </h2>
    </div>
  );
}

export default MessageGlimpse;
