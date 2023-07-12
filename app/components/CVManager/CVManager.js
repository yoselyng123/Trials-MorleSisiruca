import React, { useRef, useState } from 'react';
import styles from './cvManager.module.css';
import { IoAddOutline, IoAttachSharp } from 'react-icons/io5';
import CurriculumVitae from '../CurriculumVitae/CurriculumVitae';
import { uploadPDF } from '@/src/firebase/auth/signup';
import { useAuthContext } from '@/src/context/AuthContext';

function CVManager({ setModalOpen, adjCvList, setAdjCvList }) {
  const fileInputRef = useRef();

  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

  const handleCreateCv = () => {
    setModalOpen(true);
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

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    await uploadPDF(file, user, setLoading, setAdjCvList);
    alert('CV Uploaded Successfully'); // You can handle the file here
  };

  return (
    <div className={styles.cvsWrapper}>
      <div className={styles.cvsTop}>
        <p className={styles.subtitleText}>Associated CV's</p>
        <div
          style={{
            display: 'flex',
            gap: '10px',
          }}
        >
          <div
            className={styles.cvIconAddWrapper}
            onClick={() => handleCreateCv()}
          >
            <IoAddOutline size={25} color='#9596A9' />
          </div>
          <div className={styles.cvIconAddWrapper} onClick={triggerFileInput}>
            <input
              type='file'
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <IoAttachSharp size={25} color='#9596A9' />
          </div>
        </div>
      </div>
      <div className={styles.cvListWrapper}>
        {adjCvList.length > 0 ? (
          adjCvList.map((cv, index) => (
            <CurriculumVitae
              title={handlegetFileName(cv)}
              key={index}
              cvURL={cv}
              adjCvList={adjCvList}
              setAdjCvList={setAdjCvList}
            />
          ))
        ) : (
          <p>No Cvs</p>
        )}
      </div>
    </div>
  );
}

export default CVManager;
