import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OptionsBar from '../../GroupPageComponents/OptionsBar';
import MessageReplies from '../MessageReplies';
import ReplyCreate from '../ReplyCreate';

function MessagePage() {
  const { groupIdx, messageIdx } = useParams();
  const message = useSelector(state => state.group.messageBoards[groupIdx][messageIdx]);
  const replies = useSelector(state => state.group.messageReplies[groupIdx][messageIdx]);
  const user = useSelector(state => state.session.user);

  return (
    <div>
      <OptionsBar />
      <h1>{message.title}</h1>
      { user.id === message.userId &&
      <p>Edit --- TODO </p> }
      <p>{message.message}</p>
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
