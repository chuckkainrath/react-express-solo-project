import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import OptionsBar from '../../GroupPageComponents/OptionsBar';
import MessageReplies from '../MessageReplies';
import ReplyCreate from '../ReplyCreate';
import MessageCreate from '../MessageCreate';
import styles from './MessagePage.module.css';

function MessagePage() {
  const { groupIdx, messageIdx } = useParams();
  const message = useSelector(state => state.group.messageBoards[groupIdx][messageIdx]);
  const replies = useSelector(state => state.group.messageReplies[groupIdx][messageIdx]);
  const user = useSelector(state => state.session.user);
  const [editMsg, toggleEditMsg] = useState(false);

  return (
    <div className={styles.page__wrapper}>
      <OptionsBar />
      <div className={styles.page__container}>
        { user.id === message.userId &&
          <button className={styles.page__edit} onClick={() => toggleEditMsg(!editMsg)}>{editMsg ? 'Cancel' : 'Edit'}</button> }
        {editMsg && <MessageCreate toggleEditMsg={toggleEditMsg} messageId={message.id} oldTitle={message.title} oldMessage={message.message} />}
        {!editMsg &&
          <div className={styles.msg__info}>
            <h1>{message.title}</h1>
            <h2>{message.username}</h2>
            <p>{message.message}</p>
          </div>
        }
        <div className={styles.reply__container}>
          {replies.map((reply, idx) => {
            return <MessageReplies key={idx} replyIdx={idx}>{reply}</MessageReplies>
          })}
        </div>
        <ReplyCreate messageId={message.id} />
      </div>
    </div>
  );
}

export default MessagePage;
