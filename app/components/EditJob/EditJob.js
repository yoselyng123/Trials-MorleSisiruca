'use client';
import React, { useState } from 'react';
import styles from './editJob.module.css';
import ActionBtn from '../ActionBtn/ActionBtn';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';
import { useAuthContext } from '@/src/context/AuthContext';
import JobOfferForm from '../JobOfferForm/JobOfferForm';

function EditJob({ clickedJob, updateJobBtnClick, setUpdateJobBtnClick }) {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.topLeftContainer}>
          <p className={styles.pageTitleTop}>Edit Job</p>
          <BiChevronRight size={18} fill='#000' />
          <p className={styles.pageSubtitleTop}>Job Details</p>
        </div>
        <div className={styles.topRightContainer}>
          <ActionBtn
            title='Save Changes'
            icon={<AiOutlineArrowRight size={18} fill='#000' />}
            actionFunction={() => setUpdateJobBtnClick(true)}
            disabled={loading}
          />
        </div>
      </div>
      <JobOfferForm
        updateJobBtnClick={updateJobBtnClick}
        setUpdateJobBtnClick={setUpdateJobBtnClick}
        typeForm='update'
        job={clickedJob}
      />
    </div>
  );
}

export default EditJob;
