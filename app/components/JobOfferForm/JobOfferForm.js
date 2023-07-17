'use client';
import React, { useEffect, useState } from 'react';
import styles from './jobOfferForm.module.css';
import InputBox from '../InputBox/InputBox';
import Filter from '../Filter/Filter';
import { countryList, expertiseAreas, jobCategories } from '@/src/data/data';
import JobCategory from '../JobCategory/JobCategory';
import {
  createJob,
  getJobsListByCompany,
  updateJob,
} from '@/src/firebase/firestore/job';
import { useAuthContext } from '@/src/context/AuthContext';
import SearchBar from '../SearchBar/SearchBar';
import Modal from '../Modal/Modal';
import ConfirmationPrompt from '../ConfirmationPrompt/ConfirmationPrompt';
import CustomMessageForm from '../CustomMessageForm/CustomMessageForm';

function JobOfferForm({
  createJobBtnClick,
  setCreateJobBtnClick,
  updateJobBtnClick,
  setUpdateJobBtnClick,
  typeForm,
  job,
  setParentModalOpen,
}) {
  const { user } = useAuthContext();

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [location, setLocation] = useState('');
  const [requiredExperience, setRequiredExperience] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [applicantLimit, setApplicantLimit] = useState('');
  const [jobState, setJobState] = useState('');
  const [jobType, setJobType] = useState('');
  const [paymentRange, setPaymentRange] = useState('');
  const [listExpertiseAreas, setListExpertiseAreas] = useState([]);
  const [listJobCategories, setListJobCategories] = useState([]);

  const [promptClicked, setPromptClicked] = useState(false);
  const [modalPromptOpen, setModalPromptOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [finishUpdate, setFinishUpdate] = useState(false);

  const handleDeleteExpertiseArea = (index) => {
    var copyOfListExpertiseArea = [...listExpertiseAreas];
    copyOfListExpertiseArea.splice(index, 1);
    setListExpertiseAreas(copyOfListExpertiseArea);
  };

  const handleDeleteJobCategory = (index) => {
    var copyOfListJobCategories = [...listJobCategories];
    copyOfListJobCategories.splice(index, 1);
    setListJobCategories(copyOfListJobCategories);
  };

  const handleCreateJob = async () => {
    // TODO: INPUT VALIDATION
    const { errorAddData, docRef } = await createJob(
      jobTitle,
      jobDescription,
      requiredExperience,
      jobState,
      listExpertiseAreas,
      listJobCategories,
      location,
      user.uid,
      jobType,
      applicantLimit,
      paymentRange,
      experienceLevel
    );

    if (docRef) {
      alert('Job offer has been created successfully!');
      setJobTitle('');
      setJobDescription('');
      setLocation('');
      setRequiredExperience('');
      setApplicantLimit('');
      setJobState('');
      setJobType('');
      setListExpertiseAreas([]);
      setListJobCategories([]);
      setExperienceLevel('');
      setPaymentRange('');
    } else {
      console.log('ERROR CREATING JOB OFFER');
    }

    setCreateJobBtnClick(false);
  };

  const handleUpdateJob = async () => {
    if (jobState === 'closed' && job.applicants.length !== 0) {
      setModalPromptOpen(true);
    } else {
      handleFinishUpdate();
    }
  };

  const handleFinishUpdate = async () => {
    const { jobRefUpdate, errorUpdate, errorGetUpdate } = await updateJob(
      job,
      jobTitle,
      jobDescription,
      requiredExperience,
      jobState,
      listExpertiseAreas,
      listJobCategories,
      location,
      jobType,
      applicantLimit,
      paymentRange,
      experienceLevel
    );

    if (jobRefUpdate) {
      alert('Job offer has been updated successfully!');
      setJobTitle(jobRefUpdate.title);
      setJobDescription(jobRefUpdate.description);
      setLocation(jobRefUpdate.location);
      setRequiredExperience(jobRefUpdate?.requiredExperience);
      setApplicantLimit(jobRefUpdate.applicantLimit);
      setJobState(jobRefUpdate.state);
      setJobType(jobRefUpdate.jobType);
      setListExpertiseAreas(jobRefUpdate.expertiseAreas);
      setListJobCategories(jobRefUpdate.jobCategories);
      setExperienceLevel(jobRefUpdate?.experienceLevel);
      setPaymentRange(jobRefUpdate?.paymentRange);
    } else {
      console.log('ERROR UPDATING JOB OFFER');
    }

    setUpdateJobBtnClick(false);
    setParentModalOpen(false);
  };

  useEffect(() => {
    if (createJobBtnClick) {
      handleCreateJob();
    }
  }, [createJobBtnClick]);

  useEffect(() => {
    if (finishUpdate) {
      handleFinishUpdate();
    }
  }, [finishUpdate]);

  useEffect(() => {
    if (updateJobBtnClick) {
      handleUpdateJob();
    }
  }, [updateJobBtnClick]);

  useEffect(() => {
    if (typeForm === 'update') {
      setJobTitle(job.title);
      setJobDescription(job.description);
      setLocation(job.location);
      if (job?.requiredExperience) {
        setRequiredExperience(job.requiredExperience);
      }
      setApplicantLimit(job.applicantLimit);
      setJobState(job.state);
      setJobType(job.jobType);
      setListExpertiseAreas(job.expertiseAreas);
      setListJobCategories(job.jobCategories);
      setPaymentRange(job.paymentRange);
      console.log(experienceLevel);
      if (job?.experienceLevel) {
        setExperienceLevel(job.experienceLevel);
      }
    }
  }, []);

  useEffect(() => {
    if (promptClicked === 'no') {
      handleFinishUpdate();
    }
  }, [promptClicked]);

  return (
    <div className={styles.jobForm}>
      <InputBox
        value={jobTitle}
        setValue={setJobTitle}
        placeholder='UI/UX Designer'
        label='Job Title'
      />
      <InputBox
        value={jobDescription}
        setValue={setJobDescription}
        placeholder=''
        label='Job Description'
        isTextArea={true}
      />
      <div className={styles.jobFormMultiColumn}>
        <div className={styles.jobFormLeft}>
          <p className={styles.labelText}>Job Type</p>
          <Filter
            title='Job Type'
            options={['Full-Time', 'Part-Time', 'Remote']}
            selectedOption={jobType}
            setSelectedOption={setJobType}
            overwriteStyle={{
              marginBottom: '20px',
              borderRadius: '4px',
              width: '100%',
              padding: '18px',
            }}
            filterOptionsStyle={{
              top: '85%',
            }}
          />

          <p className={styles.labelText}>Location</p>
          <Filter
            title='Location'
            options={countryList}
            selectedOption={location}
            setSelectedOption={setLocation}
            overwriteStyle={{
              marginBottom: '20px',
              borderRadius: '4px',
              width: '100%',
              padding: '18px',
            }}
            filterOptionsStyle={{
              top: '85%',
            }}
          />

          <p className={styles.labelText}>Associated Expertise Areas</p>
          <SearchBar
            placeholder='Enter associated areas'
            data={expertiseAreas}
            setSelectedData={setListExpertiseAreas}
            selectedData={listExpertiseAreas}
            overrideStyle={{
              marginBottom: '20px',
            }}
          />
          <div className={styles.jobCategoriesWrapper}>
            {listExpertiseAreas.map((job, index) => (
              <JobCategory
                key={index}
                title={job}
                index={index}
                handleDelete={handleDeleteExpertiseArea}
                backgroundColor={true}
              />
            ))}
          </div>
          <InputBox
            value={applicantLimit}
            setValue={setApplicantLimit}
            placeholder='Enter applicant limit'
            label='Applicant Limit'
          />

          <InputBox
            value={requiredExperience}
            setValue={setRequiredExperience}
            placeholder='Enter experience in years (optional)'
            label='Required Experience'
          />
        </div>
        <div className={styles.jobFormRight}>
          <p className={styles.labelText}>Experience Level</p>
          <Filter
            title='Experience Level'
            options={[
              'Intern',
              'Junior',
              'Semi-Senior',
              'Senior',
              'Lead',
              'Manager',
            ]}
            selectedOption={experienceLevel}
            setSelectedOption={setExperienceLevel}
            overwriteStyle={{
              marginBottom: '20px',
              borderRadius: '4px',
              width: '100%',
              padding: '18px',
            }}
            filterOptionsStyle={{
              top: '85%',
            }}
          />

          <p className={styles.labelText}>State</p>
          <Filter
            title='State'
            options={['open', 'closed', 'not accepting candidates']}
            selectedOption={jobState}
            setSelectedOption={setJobState}
            overwriteStyle={{
              marginBottom: '20px',
              borderRadius: '4px',
              width: '100%',
              padding: '18px',
            }}
            filterOptionsStyle={{
              top: '85%',
            }}
          />
          <p className={styles.labelText}>Associated Job Categories</p>
          <SearchBar
            placeholder='Enter associated categories'
            data={jobCategories}
            setSelectedData={setListJobCategories}
            selectedData={listJobCategories}
            overrideStyle={{
              marginBottom: '20px',
            }}
          />
          <div className={styles.jobCategoriesWrapper}>
            {listJobCategories.map((job, index) => (
              <JobCategory
                key={index}
                title={job}
                index={index}
                handleDelete={handleDeleteJobCategory}
                backgroundColor={true}
              />
            ))}
          </div>
          <InputBox
            value={paymentRange}
            setValue={setPaymentRange}
            placeholder='$ 800-1000'
            label='Payment Range'
          />
        </div>
      </div>

      {/* Modal */}
      {modalPromptOpen && (
        <Modal
          setIsOpen={setModalPromptOpen}
          modalContent={
            <ConfirmationPrompt
              setPromptClicked={setPromptClicked}
              setModalOpen={setModalOpen}
              setModalPromptOpen={setModalPromptOpen}
            />
          }
          overwriteStyle={{
            width: '30vw',
            height: '20vh',
          }}
          overWriteStyleModalContent={{
            padding: '0px',
          }}
        />
      )}
      {/* Modal */}
      {promptClicked === 'yes' && modalOpen && (
        <Modal
          setIsOpen={setModalOpen}
          modalContent={
            <CustomMessageForm
              jobOffer={job}
              setModalOpen={setModalOpen}
              setFinishUpdate={setFinishUpdate}
            />
          }
          overwriteStyle={{
            width: '50vw',
            height: '50vh',
          }}
          overWriteStyleModalContent={{
            padding: '0px',
          }}
        />
      )}
    </div>
  );
}

export default JobOfferForm;
