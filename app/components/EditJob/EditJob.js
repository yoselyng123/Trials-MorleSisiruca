'use client';
import React, { useEffect, useState } from 'react';
import styles from './editJob.module.css';
import ActionBtn from '../ActionBtn/ActionBtn';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useAuthContext } from '@/src/context/AuthContext';
import JobOfferForm from '../JobOfferForm/JobOfferForm';

function EditJob({
  clickedJob,
  updateJobBtnClick,
  setUpdateJobBtnClick,
  setDeleteJobBtnClick,
  setModalOpen,
}) {
  const { user } = useAuthContext();

  const [loadingChanges, setLoadingChanges] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    setUpdateJobBtnClick(false);
  }, []);

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
            title='Delete'
            icon={<RiDeleteBin5Fill size={18} fill='#000' />}
            actionFunction={() => setDeleteJobBtnClick(true)}
            disabled={loadingDelete}
            overwriteStyle={{
              backgroundColor: '#FF4949',
              width: 'fit-content',
              padding: '8px',
            }}
          />
          <ActionBtn
            title='Save Changes'
            icon={<AiOutlineArrowRight size={18} fill='#000' />}
            actionFunction={() => setUpdateJobBtnClick(true)}
            disabled={loadingChanges}
            overwriteStyle={{
              width: 'fit-content',
              padding: '8px',
            }}
          />
        </div>
      </div>
      <JobOfferForm
        updateJobBtnClick={updateJobBtnClick}
        setUpdateJobBtnClick={setUpdateJobBtnClick}
        typeForm='update'
        job={clickedJob}
        setParentModalOpen={setModalOpen}
      />
    </div>
  );
}

export default EditJob;
