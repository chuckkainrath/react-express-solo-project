import OptionsBar from '../../GroupPageComponents/OptionsBar';
import styles from './SchedulePage.module.css';

function SchedulePage() {
  return (
    <>
      <OptionsBar />
      <div className={styles.schedule__container}>
        <h1>Schedule</h1>
        <h2>In Progress</h2>
      </div>
    </>
  )
}

export default SchedulePage;
