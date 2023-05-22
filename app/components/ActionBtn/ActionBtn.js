import styles from './actionBtn.module.css';

function ActionBtn({ title, icon, actionFunction }) {
  return (
    <div className={styles.btnWrapper} onClick={actionFunction}>
      <p className={styles.btnText}>{title}</p>
      <div className={styles.iconWrapper}>{icon}</div>
    </div>
  );
}

export default ActionBtn;
