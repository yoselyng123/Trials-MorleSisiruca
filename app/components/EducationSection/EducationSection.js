import React, { useState } from 'react';
import styles from './educationSection.module.css';
import EducationCard from '../EducationCard/EducationCard';
import { BiPencil } from 'react-icons/bi';
import { IoAddOutline } from 'react-icons/io5';
import EducationForm from '../EducationForm/EducationForm';
import Modal from '../Modal/Modal';

function EducationSection({ educationList, setEducationList }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedEducation, setClickedEducation] = useState({});
  const [clickedType, setClickedType] = useState('');

  const handleAddEducation = () => {
    setModalOpen(true);
    setClickedType('add');
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <p className={styles.title}>Education</p>
        <div className={styles.iconsWrapper}>
          <div
            className={styles.cvIconAddWrapper}
            onClick={() => handleAddEducation()}
          >
            <IoAddOutline size={25} color='#9596A9' />
          </div>
          <div className={styles.cvIconAddWrapper}>
            <BiPencil size={20} color='rgba(0,0,0,0.4)' />
          </div>
        </div>
      </div>
      <div className={styles.educationCardsWrapper}>
        {educationList.map((education, index) => (
          <EducationCard
            key={index}
            education={education}
            setClickedEducation={setClickedEducation}
            setModalOpen={setModalOpen}
            setClickedType={setClickedType}
          />
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <Modal
          setIsOpen={setModalOpen}
          modalContent={
            <EducationForm
              educationList={educationList}
              setEducationList={setEducationList}
              setModalOpen={setModalOpen}
              clickedEducation={clickedEducation}
              type={clickedType}
            />
          }
          overWriteStyleModalContent={{
            padding: '0px',
          }}
        />
      )}
    </div>
  );
}

export default EducationSection;
