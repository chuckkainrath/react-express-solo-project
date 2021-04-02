import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OptionsBar from '../OptionsBar';
import TodoContainer from '../TodoContainer';
import MessageBoardContainer from '../MessageBoardContainer';
import styles from './GroupPage.module.css';

function GroupPage() {
  const { groupIdx } = useParams();
  const group = useSelector(state => state.group.groups[groupIdx]);

  return (
    <>
      <OptionsBar />
      <div className={styles.group__container}>
        <h1 className={styles.group__name}>{group.name}</h1>
        <div className={styles.comp__container}>
          <TodoContainer />
          <MessageBoardContainer />
        </div>
      </div>
    </>
  );
}

export default GroupPage;
