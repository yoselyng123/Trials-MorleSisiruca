import Link from 'next/link';
import styles from './sideOption.module.css';

function SideOption({ title, icon, primary, link }) {
  return (
    <Link
      className={primary ? styles.container2 : styles.container}
      href={link}
    >
      <div className={styles.iconWrapper}>{icon}</div>
      <p className={primary ? styles.text2 : styles.text}>{title}</p>
    </Link>
  );
}

export default SideOption;
