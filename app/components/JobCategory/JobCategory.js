import styles from './jobCategory.module.css';
import { MdOutlineClose } from 'react-icons/md';

function JobCategory({ title, handleDelete, index }) {
  return (
    <div className={styles.container}>
      <p className={styles.jobTitle}>{title}</p>
      <MdOutlineClose
        size={16}
        className={styles.icon}
        onClick={() => handleDelete(index)}
      />
    </div>
  );
}

export default JobCategory;
