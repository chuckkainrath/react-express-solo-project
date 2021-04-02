import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './MessageBoardContainer.module.css';

function MessageBoardContainer() {
  const { groupIdx } = useParams();
  const messages = useSelector(state => state.group.messageBoards[groupIdx]);

  return(
    <div className={styles.messages__container}>
      <h1 className={styles.title}>Message Board</h1>
      <div className={styles.content__container}>
        {messages.map(message => {
          return (
          <div key={message.id} className={styles.message__container}>
            <h2>{message.title}</h2>
            <p>{message.message}</p>
          </div>
        )})}
      </div>
    </div>
  );
}

export default MessageBoardContainer;
