import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createMessage } from '../../../store/group';

function MessageCreate() {
  const dispatch = useDispatch();
  const { groupIdx } = useParams();
  const group = useSelector(state => state.group.groups[groupIdx]);
  const [create, setCreate] = useState(false);
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [titleInvalid, setTitleInvalid] = useState(true);
  const [msgInvalid, setMsgInvalid] = useState(true);

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
    dispatch(createMessage({
      message: msg,
      title,
      groupIdx,
      groupId: group.id
    }));
    setTitle('');
    setMsg('');
    setTitleInvalid(true);
    setMsgInvalid(true);
    setCreate(false);
  }

  return (
    <div>
      <button onClick={() => setCreate(!create)}>Create a Message</button>
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
          <button disabled={titleInvalid && msgInvalid} onClick={submitMsg}>Submit Message</button>
        </div>
      )}
    </div>
  )
}

export default MessageCreate;
