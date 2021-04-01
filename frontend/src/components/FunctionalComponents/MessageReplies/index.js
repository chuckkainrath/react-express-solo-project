import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MesssageReplies({children}) {
  const user = useSelector(state => state.session.user);
  const { groupIdx, messageIdx } = useParams();
  return (
    <li>
      {user.id === children.id && (
        <div>Edit reply</div>
      )}
      <div>{children.reply}</div>
    </li>
  )
}

export default MesssageReplies;
