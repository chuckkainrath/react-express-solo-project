import OptionsBar from '../../GroupPageComponents/OptionsBar';
import styles from './SchedulePage.module.css';

function SchedulePage() {
  return (
    <div className={styles.page__container}>
      <OptionsBar />
      <div className={styles.schedule__container}>
        <h1>Schedule</h1>
        <h2>In Progress</h2>
      </div>
    </div>
  )
}

export default SchedulePage;
