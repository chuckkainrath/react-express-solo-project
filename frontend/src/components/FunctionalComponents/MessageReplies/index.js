import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editMessageReply } from '../../../store/group';

function MessageReplies({children}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const { groupIdx, messageIdx } = useParams();
  const [edit, toggleEdit] = useState(false);
  const [editReply, setEditReply] = useState(children.reply);
  const [editSubmit, setEditSubmit] = useState(true);

  const changeReply = e => {
    const newReply = e.target.value;
    if (newReply === children.reply || newReply.length === 0) {
      setEditSubmit(true);
    } else {
      setEditSubmit(false);
    }
    setEditReply(newReply);
  }

  const submitEdit = () => {
    dispatch(editMessageReply({
      reply: editReply,
      replyId: children.id,
      groupIdx,
      messageIdx,
    })); // Finish this
    toggleEdit(false);
    setEditSubmit(true);
  }

  return (
    <li>
      {user.id === children.userId && (
        <button onClick={() => toggleEdit(!edit)}>
          {edit ? 'Cancel' : 'Edit'}
        </button>
      )}
      {!edit && <div>{children.reply}</div>}
      {edit && (
        <>
          <textarea
            value={editReply}
            onChange={changeReply}
          />
          <button disabled={editSubmit} onClick={submitEdit}>Submit</button>
        </>
      )}
    </li>
  )
}

export default MessageReplies;
