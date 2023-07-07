'use client';
import React, { useContext, useEffect, useState } from 'react';
import styles from './createJob.module.css';
import InputBox from '../components/InputBox/InputBox';
import SearchBar from '../components/SearchBar/SearchBar';
import { countryList, expertiseAreas, jobCategories } from '@/src/data/data';
import JobCategory from '../components/JobCategory/JobCategory';
import ActionBtn from '../components/ActionBtn/ActionBtn';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';
import { createJob } from '@/src/firebase/firestore/job';
import { useAuthContext } from '@/src/context/AuthContext';
import Filter from '../components/Filter/Filter';

function page() {
  const { user } = useAuthContext();

  const [createJobBtnClick, setCreateJobBtnClick] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setExperienceLevel([]);
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
        <div className={styles.topRightContainer}>
          <ActionBtn
            title='Create job'
            icon={<AiOutlineArrowRight size={18} fill='#000' />}
            actionFunction={() => setCreateJobBtnClick(true)}
            disabled={loading}
          />
        </div>
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
              options={['open', 'close', 'not accepting candidates']}
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
      </div>
    </div>
  );
}

export default page;
