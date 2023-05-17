import Link from 'next/link';
import styles from './actionBtn.module.css';

function ActionBtn({ title, link, primary }) {
  return (
    <Link
      href={link}
      className={primary ? styles.btnWrapper : styles.btnWrapper2}
    >
      <p className={styles.btnText}>{title}</p>
    </Link>
  );
}

export default ActionBtn;
