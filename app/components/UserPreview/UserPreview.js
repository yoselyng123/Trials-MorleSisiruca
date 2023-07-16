import React from 'react';
import ReactDOM from 'react-dom';
import styles from './userPreview.module.css';
import ListExpertiseCategories from '../ListExpertiseCategories/ListExpertiseCategories';
import { AiFillEye } from 'react-icons/ai';

function UserPreview({ clickedUser, hasCV, cvURL }) {
  const defaultAvatar =
    'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';

  function openInNewTab(component) {
    const newWindow = window.open('', '_blank');

    newWindow.document.body.style.margin = '0';

    ReactDOM.render(component, newWindow.document.body);
  }

  const handlePreview = async () => {
    openInNewTab(
      <embed
        type='application/pdf'
        width={100 + '%'}
        src={cvURL}
        height={100 + '%'}
      />
    );
    // setViewPDF(true);
  };

  const handlegetFileName = (cv) => {
    let match = cv.match(/\/([^\/?]*)(\?|$)/);
    if (match) {
      let filename = decodeURIComponent(match[1]); // This will give '8Iy8yCzFXPeHDT2F1VdgBhV2IWf2_2023-07-11T19:18:53.279Z.pdf'
      return filename.split('/')[1];
    } else {
      return null;
    }
  };

  return (
    <div className={styles.container}>
      <img
        src={clickedUser?.profilePic ? clickedUser?.profilePic : defaultAvatar}
        alt='avatar'
        className={styles.profileAvatar}
      />
      <div className={styles.topInfoWrapper}>
        <p
          className={styles.userNameText}
        >{`${clickedUser.name} ${clickedUser.lastname}`}</p>
        <p className={styles.infoText}>{`${clickedUser.description}`}</p>
        <p className={styles.locationText}>{`${clickedUser.location}`}</p>
        <div className={styles.contactWrapper}>
          <p className={styles.subtitleText}>Contact Info</p>
          <p className={styles.infoText}>
            <span className={styles.locationText}> Email: </span>
            {clickedUser.email}
          </p>
        </div>
      </div>
      <ListExpertiseCategories
        title={'Expertise Areas'}
        listElements={clickedUser.listExpertiseAreas}
      />
      <ListExpertiseCategories
        title={'Job Categories'}
        listElements={clickedUser.jobCategories}
      />
      {hasCV && (
        <div>
          <p className={styles.subtitleText}>Attached CV</p>
          <div className={styles.cvContainer}>
            <div className={styles.leftContainer}>
              <p className={styles.cvTitle} onClick={handlePreview}>
                {handlegetFileName(cvURL)}
              </p>
            </div>
            <div className={styles.rightContainer}>
              <div className={styles.cvIconAddWrapper}>
                <AiFillEye
                  size={20}
                  color='rgba(0,0,0,0.4)'
                  onClick={handlePreview}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPreview;
