import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { createMessage, editMessage } from '../../../store/group';

function MessageCreate({oldTitle, oldMessage, messageId, toggleEditMsg}) {
  let edit = oldTitle && oldMessage;
  const history = useHistory();
  const dispatch = useDispatch();
  const { groupIdx, messageIdx } = useParams();
  const group = useSelector(state => state.group.groups[groupIdx]);
  const [create, setCreate] = useState(edit);
  const [title, setTitle] = useState(edit ? oldTitle : '');
  const [msg, setMsg] = useState(edit ? oldMessage : '');
  const [titleInvalid, setTitleInvalid] = useState(!edit);
  const [msgInvalid, setMsgInvalid] = useState(!edit);

  const titleChange = e => {
    const newTitle = e.target.value;
    if (newTitle.length === 0 || newTitle.length > 50) {
      setTitleInvalid(true);
    } else {
      setTitleInvalid(true);
    }
    setTitle(newTitle);
  }
  const msgChange = e => {
    const newMsg = e.target.value;
    if (newMsg.length === 0) {
      setMsgInvalid(true);
    } else {
      setMsgInvalid(false);
    }
    setMsg(newMsg);
  }
  const submitMsg = () => {
    if (edit) {
      dispatch(editMessage({
        message: msg,
        title,
        groupIdx,
        messageId: messageId
      }));
      toggleEditMsg(false);
    } else {
      dispatch(createMessage({
        message: msg,
        title,
        groupIdx,
        groupId: group.id
      }));
    }
    setTitle('');
    setMsg('');
    setTitleInvalid(true);
    setMsgInvalid(true);
    setCreate(false);
  }

  return (
    <div>
      {!edit &&
      <button onClick={() => setCreate(!create)}>Create a Message</button>
      }
      {create && (
        <div>
          <label>
            <input
              type='text'
              placeholder='Title...'
              value={title}
              onChange={titleChange}
            />
          </label>
          <textarea
            placeholder='Message...'
            value={msg}
            onChange={msgChange}
          />
          <button disabled={titleInvalid && msgInvalid} onClick={submitMsg}>
            {edit ? 'Submit Edit' : 'Submit Message'}
          </button>
        </div>
      )}
    </div>
  )
}

export default MessageCreate;
