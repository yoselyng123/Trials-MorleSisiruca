import styles from './actionBtn.module.css';

function ActionBtn({ title, icon, actionFunction, disabled, overwriteStyle }) {
  return (
    <button
      className={styles.btnWrapper}
      onClick={actionFunction}
      disabled={disabled}
      style={overwriteStyle}
    >
      <p className={styles.btnText}>{title}</p>
      {icon && <div className={styles.iconWrapper}>{icon}</div>}
    </button>
  );
}

export default ActionBtn;
