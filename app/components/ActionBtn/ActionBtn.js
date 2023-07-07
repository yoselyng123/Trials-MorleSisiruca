import styles from './actionBtn.module.css';

function ActionBtn({ title, icon, actionFunction, disabled }) {
  return (
    <button
      className={styles.btnWrapper}
      onClick={actionFunction}
      disabled={disabled}
    >
      <p className={styles.btnText}>{title}</p>
      {icon && <div className={styles.iconWrapper}>{icon}</div>}
    </button>
  );
}

export default ActionBtn;
