import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './curriculumVitae.module.css';
import { AiFillDelete, AiFillFile, AiFillEye } from 'react-icons/ai';
import Modal from '../Modal/Modal';
import { deletePDF } from '@/src/firebase/auth/signup';
import { useAuthContext } from '@/src/context/AuthContext';

function CurriculumVitae({ title, cvURL, adjCvList, setAdjCvList }) {
  const [viewPDF, setViewPDF] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const handleDelete = async () => {
    await deletePDF(user, cvURL, setLoading, adjCvList, setAdjCvList);
  };

  const handlePreview = () => {
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

  function openInNewTab(component) {
    const newWindow = window.open('', '_blank');

    newWindow.document.body.style.margin = '0';

    ReactDOM.render(component, newWindow.document.body);
  }

  return (
    <div className={styles.cvContainer}>
      <div className={styles.leftContainer}>
        <AiFillFile size={20} color='rgba(0,0,0,0.4)' />
        <p className={styles.cvTitle} onClick={handlePreview}>
          {title}
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
        <div className={styles.cvIconAddWrapper}>
          <AiFillDelete
            size={20}
            color='rgba(0,0,0,0.4)'
            onClick={() => handleDelete()}
          />
        </div>
      </div>

      {viewPDF && (
        <Modal
          setIsOpen={setViewPDF}
          modalContent={
            <embed
              type='application/pdf'
              width={100 + '%'}
              src={cvURL}
              height={100 + '%'}
            />
          }
          overwriteStyle={{
            width: '90vw',
            height: '90vh',
          }}
          overWriteStyleModalContent={{
            padding: '0px',
          }}
        />
      )}
    </div>
  );
}

export default CurriculumVitae;
