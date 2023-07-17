import React, { useState } from 'react';
import styles from './jobExperienceSection.module.css';
import { BiPencil } from 'react-icons/bi';
import { IoAddOutline } from 'react-icons/io5';
import JobExperienceCard from '../JobExperienceCard/JobExperienceCard';
import Modal from '../Modal/Modal';
import JobExperienceForm from '../JobExperienceForm/JobExperienceForm';

function JobExperienceSection({ jobExperienceList, setJobExperienceList }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedJobExperience, setClickedJobExperience] = useState({});
  const [clickedType, setClickedType] = useState('');

  const handleAddExperience = () => {
    setModalOpen(true);
    setClickedType('add');
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <p className={styles.title}>Experience</p>
        <div className={styles.iconsWrapper}>
          <div
            className={styles.cvIconAddWrapper}
            onClick={() => handleAddExperience()}
          >
            <IoAddOutline size={25} color='#9596A9' />
          </div>
        </div>
      </div>
      <div className={styles.experienceCardsWrapper}>
        {jobExperienceList.map((jobExperience, index) => (
          <JobExperienceCard
            key={index}
            jobExperience={jobExperience}
            setClickedJobExperience={setClickedJobExperience}
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
            <JobExperienceForm
              jobExperienceList={jobExperienceList}
              setJobExperienceList={setJobExperienceList}
              setModalOpen={setModalOpen}
              clickedJobExperience={clickedJobExperience}
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

export default JobExperienceSection;
