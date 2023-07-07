import React from 'react';
import styles from './listExpertiseCategories.module.css';

import { AiOutlineArrowRight } from 'react-icons/ai';

function ListExpertiseCategories({ title, listElements }) {
  return (
    <div className={styles.container}>
      <p className={styles.subtitleText}>{title}</p>
      <div className={styles.elementsWrapper}>
        {listElements.map((element, index) => (
          <div className={styles.elementContainer} key={index}>
            <p className={styles.elementtext}>{element}</p>
          </div>
        ))}
      </div>

      {listElements.length > 3 && (
        <button className={styles.showAllBtn}>
          <p className={styles.showAllText}>
            Show all {listElements.length} elements
          </p>
          <AiOutlineArrowRight color='rgba(0, 0, 0, 0.6)' size={20} />
        </button>
      )}
    </div>
  );
}

export default ListExpertiseCategories;
