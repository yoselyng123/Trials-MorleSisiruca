import React from 'react';
import styles from './modal.module.css';
import { RiCloseLine } from 'react-icons/ri';
import { HiLightBulb } from 'react-icons/hi';
import {
  BsFillBriefcaseFill,
  BsFillBuildingFill,
  BsArrowUpRightCircle,
} from 'react-icons/bs';
import ReactTimeago from 'react-timeago';

function Modal({ setIsOpen, clickedCompany, clickedJob }) {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div className={styles.modalContent}>
            <h5 className={styles.jobTitle}>{clickedJob.title}</h5>
            <p className={styles.jobInfo}>
              {clickedCompany.name} - {clickedJob.location}
            </p>
            <ReactTimeago
              date={clickedJob.publishedDate}
              style={{
                color: '#7C8AA3',
                fontWeight: '400',
                fontSize: '14px',
              }}
            />

            <div className={styles.jobInfoWithIconWrapper}>
              <BsFillBriefcaseFill color='#56687a' size={20} />
              <p className={styles.jobInfo}>
                {clickedJob.jobType} - {clickedJob.requiredExperience}
              </p>
            </div>
            <div className={styles.jobInfoWithIconWrapper}>
              <BsFillBuildingFill color='#56687a' size={20} />
              <p className={styles.jobInfo}>51-200 employees</p>
            </div>
            <div className={styles.jobInfoWithIconWrapper}>
              <HiLightBulb color='#56687a' size={20} />
              <p className={styles.jobInfo}>
                {clickedJob.applicants.length} applicants
              </p>
            </div>
            <button className={styles.applyBtn}>
              <p className={styles.applyBtnText}>Apply</p>
              <BsArrowUpRightCircle color='#000' size={20} />
            </button>
            <p className={styles.subtitle}>About the job</p>
            <p className={styles.jobInfoDescription}>
              {clickedJob.description}
            </p>
            <p className={styles.subtitle}>About the company</p>
            <div className={styles.companyWrapper}>
              <img
                className={styles.personalAvatar}
                alt='avatar'
                src={clickedCompany.profilePic}
              />
              <div className={styles.companyInfoWrapper}>
                <p className={styles.companyTitle}>{clickedCompany.name}</p>
                <p className={styles.companyInfoText}>
                  Web Url: {clickedCompany.webUrl}
                </p>
                <p className={styles.companyInfoText}>
                  Location: {clickedCompany.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
