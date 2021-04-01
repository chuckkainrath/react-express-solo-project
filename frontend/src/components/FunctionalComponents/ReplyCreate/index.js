import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createMessageReply } from '../../../store/group';

function ReplyCreate({messageId}) {
  const dispatch = useDispatch();
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
      messageIdx
    }));
    setReply('');
  }

  return (
    <div>
      <label>Add a reply to the message.
        <textarea
          placeholder='Add a reply...'
          value={reply}
          onChange={editReply}
        />
        <button disabled={btnDisable} onClick={submitReply}>Submit Reply</button>
      </label>
    </div>
  );
}

export default ReplyCreate;
