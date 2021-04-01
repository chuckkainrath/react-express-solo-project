import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import OptionsBar from '../../GroupPageComponents/OptionsBar';
import MessageReplies from '../MessageReplies';
import ReplyCreate from '../ReplyCreate';
import MessageCreate from '../MessageCreate';

function MessagePage() {
  const { groupIdx, messageIdx } = useParams();
  const message = useSelector(state => state.group.messageBoards[groupIdx][messageIdx]);
  const replies = useSelector(state => state.group.messageReplies[groupIdx][messageIdx]);
  const user = useSelector(state => state.session.user);
  const [editMsg, toggleEditMsg] = useState(false);

  return (
    <div>
      <OptionsBar />
      { user.id === message.userId &&
        <button onClick={() => toggleEditMsg(!editMsg)}>Edit Message</button> }
      {editMsg && <MessageCreate toggleEditMsg={toggleEditMsg} messageId={message.id} oldTitle={message.title} oldMessage={message.message} />}
      {!editMsg &&
        <>
          <h1>{message.title}</h1>
          <p>{message.message}</p>
        </>
      }
      <ul>
        {replies.map((reply, idx) => {
          return <MessageReplies key={idx} replyIdx={idx}>{reply}</MessageReplies>
        })}
      </ul>
      <ReplyCreate messageId={message.id} />
    </div>
  );
}

export default MessagePage;
