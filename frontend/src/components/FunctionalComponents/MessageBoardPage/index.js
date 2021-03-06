import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MessageGlimpse from '../MessageGlimpse';
import OptionsBar from '../../GroupPageComponents/OptionsBar';
import MessageCreate from '../MessageCreate';
import styles from './MessageBoardPage.module.css';


function MessageBoardPage() {
  const { groupIdx } = useParams();
  const messages = useSelector(state => state.group.messageBoards[groupIdx]);

  return (
    <div className={styles.page__container}>
      <OptionsBar />
      <div className={styles.board_container}>
        <h1 className={styles.board_title}>Message Board</h1>
        <MessageCreate />
        <div>
          {messages.map((msg, idx) => {
            return <MessageGlimpse key={msg.id} messageIdx={idx} />
          })}
        </div>
      </div>
    </div>
  );
}

export default MessageBoardPage;
