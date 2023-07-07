import React from 'react';
import styles from './searchCard.module.css';

function SearchCard({ setClickedElement, searchObj, name, setModalOpen }) {
  const defaultAvatar =
    'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';

  return (
    <div
      className={styles.cardWrapper}
      onClick={() => {
        if (setClickedElement && setModalOpen) {
          setClickedElement(searchObj);
          setModalOpen(true);
        }
      }}
    >
      <img
        className={styles.personalAvatar}
        alt='avatar'
        src={searchObj?.profilePic ? searchObj?.profilePic : defaultAvatar}
      />
      <div className={styles.cardInfoWrapper}>
        <p className={styles.cardTitle}>{name}</p>
        {searchObj?.webUrl && (
          <p className={styles.cardInfoText}>Web Url: {searchObj.webUrl}</p>
        )}
        <p className={styles.cardInfoText}>Email: {searchObj.email}</p>
        <p className={styles.cardLocationText}>{searchObj.location}</p>
      </div>
    </div>
  );
}

export default SearchCard;
