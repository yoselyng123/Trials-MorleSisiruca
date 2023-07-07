import React from 'react';
import styles from './modal.module.css';
import { RiCloseLine } from 'react-icons/ri';

function Modal({ setIsOpen, modalContent }) {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <button
            className={styles.closeBtn}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div className={styles.modalContent}>{modalContent}</div>
        </div>
      </div>
    </>
  );
}

export default Modal;
