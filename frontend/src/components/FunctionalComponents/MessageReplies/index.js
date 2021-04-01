import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editMessageReply } from '../../../store/group';
import styles from './MessageReplies.module.css';

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
  console.log(children);
  return (
    <div className={styles.reply__container}>
      {!edit &&
        <div>
          <p className={styles.reply__user}>{children.username}</p>
          <p className={styles.reply__reply}>{children.reply}</p>
        </div>}
      <div className={styles.edit_btn__container}>
        {user.id === children.userId && (
          <button onClick={() => toggleEdit(!edit)}>
            {edit ? 'Cancel' : 'Edit'}
          </button>
        )}
      </div>
      {edit && (
        <div className={styles.edit__container}>
          <textarea
            value={editReply}
            onChange={changeReply}
          />
          <button disabled={editSubmit} onClick={submitEdit}>Submit</button>
        </div>
      )}
    </div>
  )
}

export default MessageReplies;
