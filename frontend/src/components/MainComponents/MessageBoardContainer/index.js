import styles from './MessageBoardContainer.module.css';

function MessageBoardContainer({ messageBoards, messageReplies }) {
  return (
    <div className={styles.messages__container}>
      <h1 className={styles.title}>Message Board</h1>
      <div className={styles.content__container}>
        {messageBoards.map((msg, idx) => {
          return (
            <div key={msg.id} className={styles.message__container}>
              <h2>{msg.title}</h2>
              <p>{msg.message}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default MessageBoardContainer;
