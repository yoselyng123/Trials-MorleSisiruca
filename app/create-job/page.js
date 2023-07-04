'use client';
import React, { useContext, useEffect, useState } from 'react';
import styles from './createJob.module.css';
import InputBox from '../components/InputBox/InputBox';
import SearchBar from '../components/SearchBar/SearchBar';
import { expertiseAreas, jobCategories } from '@/src/data/data';
import JobCategory from '../components/JobCategory/JobCategory';
import { CountryDropdown } from 'react-country-region-selector';
import SelectOption from '../components/SelectOption/SelectOption';
import ActionBtn from '../components/ActionBtn/ActionBtn';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';
import { createJob } from '@/src/firebase/firestore/job';
import { useAuthContext } from '@/src/context/AuthContext';

function page() {
  const { user } = useAuthContext();

  const [createJobBtnClick, setCreateJobBtnClick] = useState(false);
  const [loading, setLoading] = useState(false);

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [location, setLocation] = useState('');
  const [requiredExperience, setRequiredExperience] = useState('');
  const [applicantLimit, setApplicantLimit] = useState('');
  const [jobState, setJobState] = useState('');
  const [jobType, setJobType] = useState('');
  const [paymentRange, setPaymentRange] = useState('');
  const [listExpertiseAreas, setListExpertiseAreas] = useState([]);
  const [listJobCategories, setListJobCategories] = useState([]);

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
      paymentRange
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
    } else {
      console.log('ERROR CREATING JOB OFFER');
    }

    setCreateJobBtnClick(false);
  };

  useEffect(() => {
    if (createJobBtnClick) {
      handleCreateJob();
    }
  }, [createJobBtnClick]);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.topLeftContainer}>
          <p className={styles.pageTitleTop}>Create Job</p>
          <BiChevronRight size={18} fill='#000' />
          <p className={styles.pageSubtitleTop}>Job Details</p>
        </div>
        <ActionBtn
          title='Create job'
          icon={<AiOutlineArrowRight size={18} fill='#000' />}
          actionFunction={() => setCreateJobBtnClick(true)}
          disabled={loading}
        />
      </div>
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
            <InputBox
              value={requiredExperience}
              setValue={setRequiredExperience}
              placeholder='Enter experience in years (optional)'
              label='Required Experience'
            />
            <SelectOption
              optionsList={[
                'select a job type',
                'Full-Time',
                'Part-Time',
                'Remote',
              ]}
              title='Job Type'
              value={jobType}
              setValue={setJobType}
            />
            <p className={styles.labelText}>Associated Expertise Areas</p>
            <SearchBar
              placeholder='Enter associated areas'
              data={expertiseAreas}
              setSelectedData={setListExpertiseAreas}
              selectedData={listExpertiseAreas}
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
          </div>
          <div className={styles.jobFormRight}>
            <p className={styles.labelText}>Location</p>
            <CountryDropdown
              value={location}
              onChange={(val) => setLocation(val)}
              style={{
                display: 'flex',
                flex: '1',
                backgroundColor: 'rgba(255,255,255,0.07)',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '400',
                padding: '20px',
                outline: 'none',
                border: '1px solid #7C8AA3',
                marginBottom: '20px',
              }}
              tabIndex={50}
            />

            <SelectOption
              optionsList={[
                'select a state',
                'open',
                'not accepting candidates',
                'closed',
              ]}
              title='State'
              value={jobState}
              setValue={setJobState}
            />
            <p className={styles.labelText}>Associated Job Categories</p>
            <SearchBar
              placeholder='Enter associated categories'
              data={jobCategories}
              setSelectedData={setListJobCategories}
              selectedData={listJobCategories}
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
      </div>
    </div>
  );
}

export default page;
