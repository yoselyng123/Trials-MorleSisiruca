import React, { useEffect, useState } from 'react';
import styles from './cvForm.module.css';
import { useAuthContext } from '@/src/context/AuthContext';
import ActionBtn from '../ActionBtn/ActionBtn';
import PageOneCVForm from '../PageOneCVForm/PageOneCVForm';
import PageTwoCVForm from '../PageTwoCVForm/PageTwoCVForm';
import PageThreeCVForm from '../PageThreeCVForm/PageThreeCVForm';
import JobExperienceSection from '../JobExperienceSection/JobExperienceSection';
import EducationSection from '../EducationSection/EducationSection';
import PageFourCVForm from '../PageFourCVForm/PageFourCVForm';
import CVTemplate from '../CVTemplate/CVTemplate';

import { PDFViewer, pdf } from '@react-pdf/renderer';
import Modal from '../Modal/Modal';
import { uploadPDF } from '@/src/firebase/auth/signup';

function CVForm({ setAdjCvList, adjCvList, setAddFormModalOpen }) {
  const [currentPage, setCurrentPage] = useState('Personal Info');

  const { user } = useAuthContext();

  // Profile Info
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [occupation, setOccupation] = useState('');
  const [location, setLocation] = useState('');

  const [educationList, setEducationList] = useState([]);
  const [jobExperienceList, setJobExperienceList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [certificatesList, setCertificatesList] = useState([]);

  const [cvData, setCvData] = useState(null);
  const [ModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const pages = [
    'Personal Info',
    'Education',
    'Experience',
    'Skills',
    'Certificates',
  ];

  useEffect(() => {
    if (user) {
      const fullName = `${user.name} ${user.lastname}`;
      setFullName(fullName);
      setEmail(user.email);
      setDescription(user.description);
      setPhoneNumber(user.phoneNumber);
      if (user?.educationList) {
        setEducationList(user.educationList);
      }
      if (user?.jobExperienceList) {
        setJobExperienceList(user.jobExperienceList);
      }
      if (user?.skillsList) {
        setSkillsList(user.skillsList);
      }
    }
  }, []);

  const handleNextPage = () => {
    const getCurrentIndex = pages.indexOf(currentPage);

    if (getCurrentIndex < pages.length) {
      setCurrentPage(pages[getCurrentIndex + 1]);
    }
  };
  const handleBackPage = () => {
    const getCurrentIndex = pages.indexOf(currentPage);

    if (getCurrentIndex > 0) {
      setCurrentPage(pages[getCurrentIndex - 1]);
    }
  };

  const handleGenerateCV = () => {
    const newCVData = {
      fullName,
      email,
      description,
      phoneNumber,
      location,
      occupation,
      educationList,
      jobExperienceList,
      skillsList,
      certificatesList,
    };

    setCvData(newCVData);
    setModalOpen(true);
  };

  const handleAddPDF = async () => {
    const newCVData = {
      fullName,
      email,
      description,
      phoneNumber,
      location,
      occupation,
      educationList,
      jobExperienceList,
      skillsList,
      certificatesList,
    };

    setCvData(newCVData);

    const blob = await pdf(<CVTemplate cvData={newCVData} />).toBlob();
    await uploadPDF(blob, user, setLoading, setAdjCvList);

    setAddFormModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.formWrapper}>
          {currentPage === pages[0] && (
            <PageOneCVForm
              fullName={fullName}
              phoneNumber={phoneNumber}
              description={description}
              setDescription={setDescription}
              occupation={occupation}
              setOccupation={setOccupation}
              location={location}
              setLocation={setLocation}
            />
          )}
          {currentPage === pages[1] && (
            <PageTwoCVForm
              content={
                <EducationSection
                  educationList={educationList}
                  setEducationList={setEducationList}
                />
              }
              title={'Education'}
            />
          )}
          {currentPage === pages[2] && (
            <PageTwoCVForm
              content={
                <JobExperienceSection
                  jobExperienceList={jobExperienceList}
                  setJobExperienceList={setJobExperienceList}
                />
              }
              title={'Job Experience'}
            />
          )}

          {currentPage === pages[3] && (
            <PageThreeCVForm
              skillsList={skillsList}
              setSkillsList={setSkillsList}
            />
          )}
          {currentPage === pages[4] && (
            <PageFourCVForm
              certificatesList={certificatesList}
              setCertificatesList={setCertificatesList}
            />
          )}
        </div>
      </div>
      <div className={styles.footerWrapper}>
        {currentPage !== pages[0] ? (
          <ActionBtn title='Back' actionFunction={() => handleBackPage()} />
        ) : (
          <div className={styles.fakeBtn} />
        )}
        {currentPage !== pages[4] ? (
          <ActionBtn title='Next' actionFunction={() => handleNextPage()} />
        ) : (
          <div
            style={{
              display: 'flex',
              gap: '10px',
              width: '100%',
            }}
          >
            <ActionBtn
              title='Preview CV'
              actionFunction={() => handleGenerateCV()}
            />
            <ActionBtn title='Add CV' actionFunction={() => handleAddPDF()} />
          </div>
        )}
      </div>

      {cvData && ModalOpen && (
        <Modal
          setIsOpen={setModalOpen}
          modalContent={
            <PDFViewer style={{ width: '100%', height: '90vh' }}>
              <CVTemplate cvData={cvData} />
            </PDFViewer>
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

export default CVForm;
