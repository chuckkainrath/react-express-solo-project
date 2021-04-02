import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createMessageReply } from '../../../store/group';
import styles from './ReplyCreate.module.css';

function ReplyCreate({messageId}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [reply, setReply] = useState('');
  const [btnDisable, setBtnDisable] = useState(true);
  const { groupIdx, messageIdx } = useParams();

  const editReply = e => {
    const currReply = e.target.value;
    if (currReply.length === 0) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
    setReply(currReply);
  }

  const submitReply = () => {
    dispatch(createMessageReply({
      reply,
      messageBoardId: messageId,
      groupIdx,
      messageIdx,
      username: user.username,
    }));
    setReply('');
  }

  return (
    <div className={styles.reply__container}>
      <h1>Add a Reply</h1>
      <textarea
        placeholder='Add a reply...'
        value={reply}
        onChange={editReply}
      />
      <button disabled={btnDisable} onClick={submitReply}>Submit Reply</button>
    </div>
  );
}

export default ReplyCreate;
