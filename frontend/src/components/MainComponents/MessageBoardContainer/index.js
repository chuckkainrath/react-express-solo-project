
function MessageBoardContainer({ messageBoards, messageReplies }) {
  return (
    <div className='messages__container'>
      <h1>Message Board</h1>
      {messageBoards.map((msg, idx) => {
        return (
          <div key={msg.id} className='message__container'>
            <p>{msg.message}</p>
            <p>-{msg.username}</p>
            <ul className='message__replies'>
              {messageReplies[idx].map((reply, idx) => {
                return (
                  <li key={idx}>{reply.reply} -{reply.username}</li>
                );
              })}
            </ul>
          </div>
        )
      })}
    </div>
  );
}

export default MessageBoardContainer;
