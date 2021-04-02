import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './MessageBoardContainer.module.css';

function MessageBoardContainer() {
  const { groupIdx } = useParams();
  const messages = useSelector(state => state.group.messageBoards[groupIdx]);

  return(
    <div className={styles.message__container}>
      <h1>Message Board</h1>
      {messages.map(message => {
        return (
        <div key={message.id} className='message__container'>
          <h2>{message.title}</h2>
          <p>{message.message}</p>
        </div>
      )})}
    </div>
  );
}

export default MessageBoardContainer;
