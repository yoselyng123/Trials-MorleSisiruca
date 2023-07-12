import React, { useState } from 'react';
import styles from './pageFourCVForm.module.css';
import { AiFillDelete } from 'react-icons/ai';
import InputBox from '../InputBox/InputBox';
import ActionBtn from '../ActionBtn/ActionBtn';

function PageFourCVForm({ certificatesList, setCertificatesList }) {
  const [newCertificate, setNewCertificate] = useState('');

  const handleAddCertificate = () => {
    const copyOfCertificatesList = certificatesList;

    copyOfCertificatesList.push(newCertificate);
    setCertificatesList(copyOfCertificatesList);
    setNewCertificate('');
  };

  const handleDeleteCertificate = (index) => {
    const copyOfCertificatesList = [...certificatesList];

    copyOfCertificatesList.splice(index, 1);

    setCertificatesList(copyOfCertificatesList);
  };

  return (
    <div className={StyleSheet.container}>
      <p className={styles.title}>Certificates</p>
      <div className={styles.InputWrapper}>
        <InputBox
          value={newCertificate}
          setValue={setNewCertificate}
          placeholder='Ex: Certified Customer Service Professional'
          label='Certificates'
          overWriteStyle={{
            padding: '8px',
          }}
        />
        <div className={styles.btnWrapper}>
          <ActionBtn title='Add' actionFunction={handleAddCertificate} />
        </div>
      </div>
      <div className={styles.certificatesListWrapper}>
        {certificatesList.map((certificate, index) => (
          <div className={styles.certificateContainer}>
            <p className={styles.certificateText}>- {certificate}</p>
            <div
              className={styles.cvIconAddWrapper}
              onClick={() => handleDeleteCertificate(index)}
            >
              <AiFillDelete size={20} color='#9596A9' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageFourCVForm;
