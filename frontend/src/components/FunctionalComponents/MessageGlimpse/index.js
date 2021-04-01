import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


function MessageGlimpse({ messageIdx }) {
  const history = useHistory();
  const { groupIdx } = useParams();
  const message = useSelector(state => state.group.messageBoards[groupIdx][messageIdx]);
  // const replies = useSelector(state => state.group.messageReplies[groupIdx][messageIdx]);

  return (
    <div onClick={() => history.push(`/groups/${groupIdx}/message-board/${messageIdx}`)} className='message__container'>
      <h1>{message.title}</h1>
      <p>{message.message}</p>
      {/* <ul>
      {replies.map(reply => {
        return <li key={reply.id}>{reply.reply}</li>
      })}
      </ul> */}
    </div>
  );
}

export default MessageGlimpse;
