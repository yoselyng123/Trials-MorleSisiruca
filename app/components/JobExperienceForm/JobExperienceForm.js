import React, { useEffect, useState } from 'react';
import styles from './jobExperienceForm.module.css';
import InputBox from '../InputBox/InputBox';
import Filter from '../Filter/Filter';
import ActionBtn from '../ActionBtn/ActionBtn';
import { countryList } from '@/src/data/data';
import { IoAddOutline } from 'react-icons/io5';
import { AiFillDelete } from 'react-icons/ai';
import AchievementsList from '../AchievementsList/AchievementsList';

function JobExperienceForm({
  jobExperienceList,
  setJobExperienceList,
  setModalOpen,
  type,
  clickedJobExperience,
}) {
  const [title, setTitle] = useState('');
  const [jobType, setJobType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    if (type === 'edit') {
      setTitle(clickedJobExperience?.title);
      setJobType(clickedJobExperience?.jobType);
      setCompanyName(clickedJobExperience?.companyName);
      setStartYear(clickedJobExperience?.startYear);
      setStartMonth(clickedJobExperience?.startMonth);
      setEndMonth(clickedJobExperience?.endMonth);
      setEndYear(clickedJobExperience?.endYear);
      setLocation(clickedJobExperience?.location);
      if (clickedJobExperience?.achievements) {
        setAchievements(clickedJobExperience?.achievements);
      }
    }
  }, []);

  const yearOptions = () => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const yearList = [];
    for (let i = currentYear; i >= 1930; i--) {
      yearList.push(i);
    }

    return yearList;
  };

  const yearListOptions = yearOptions();

  const monthsOption = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const handleAddJobExperience = () => {
    const copyOfJobExperienceList = jobExperienceList;

    copyOfJobExperienceList.push({
      title,
      jobType,
      companyName,
      startMonth,
      startYear,
      endMonth,
      endYear,
      location,
      achievements,
      id: copyOfJobExperienceList.length + 1,
    });

    setJobExperienceList(copyOfJobExperienceList);
    setModalOpen(false);
  };

  const handleDeleteJobExperience = () => {
    const copyOfJobExperienceList = jobExperienceList;

    var indexOfJobExperience = copyOfJobExperienceList
      .map((experience) => experience.id)
      .indexOf(clickedJobExperience.id);

    if (indexOfJobExperience > -1) {
      copyOfJobExperienceList.splice(indexOfJobExperience, 1);
    }

    setJobExperienceList(copyOfJobExperienceList);
    setModalOpen(false);
  };

  const handleUpdateJobExperience = () => {
    const copyOfJobExperienceList = jobExperienceList;

    var indexOfJobExperience = copyOfJobExperienceList
      .map((experience) => experience.id)
      .indexOf(clickedJobExperience.id);

    if (indexOfJobExperience > -1) {
      copyOfJobExperienceList.splice(indexOfJobExperience, 1);
    }

    copyOfJobExperienceList.push({
      title,
      jobType,
      companyName,
      startMonth,
      startYear,
      endMonth,
      endYear,
      location,
      achievements,
      id: copyOfJobExperienceList.length + 1,
    });

    setJobExperienceList(copyOfJobExperienceList);
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <InputBox
        value={title}
        setValue={setTitle}
        placeholder='Ex: Content Creator'
        label='Title'
        overWriteStyle={{
          padding: '8px',
        }}
      />

      <div className={styles.row}>
        <div className={styles.filterWrapper}>
          <p className={styles.labelText}>Job Type</p>
          <Filter
            title='Job Type'
            options={['Full-Time', 'Part-Time', 'Remote']}
            selectedOption={jobType}
            setSelectedOption={setJobType}
            overwriteStyle={{
              padding: '6px',
              borderRadius: '4px',
            }}
          />
        </div>
        <div className={styles.filterWrapper}>
          <p className={styles.labelText}>Location</p>
          <Filter
            title='Location'
            options={countryList}
            selectedOption={location}
            setSelectedOption={setLocation}
            overwriteStyle={{
              padding: '6px',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>
      <InputBox
        value={companyName}
        setValue={setCompanyName}
        placeholder='Ex: Google Inc.'
        label='Company Name'
        overWriteStyle={{
          padding: '8px',
        }}
      />

      <p className={styles.labelText}>Start Date</p>
      <div className={styles.dateWrapper}>
        <Filter
          selectedOption={startMonth}
          setSelectedOption={setStartMonth}
          title='Month'
          options={monthsOption}
          overwriteStyle={{
            padding: '6px',
            borderRadius: '4px',
          }}
        />
        <Filter
          selectedOption={startYear}
          setSelectedOption={setStartYear}
          options={yearListOptions}
          overwriteStyle={{
            padding: '6px',
            borderRadius: '4px',
          }}
          title='Year'
        />
      </div>
      <p className={styles.labelText}>End Date</p>
      <div className={styles.dateWrapper}>
        <Filter
          selectedOption={endMonth}
          setSelectedOption={setEndMonth}
          title='Month'
          options={monthsOption}
          overwriteStyle={{
            padding: '6px',
            borderRadius: '4px',
          }}
        />
        <Filter
          selectedOption={endYear}
          setSelectedOption={setEndYear}
          title='Year'
          options={yearListOptions}
          overwriteStyle={{
            padding: '6px',
            borderRadius: '4px',
          }}
        />
      </div>
      <AchievementsList
        achievements={achievements}
        setAchievements={setAchievements}
      />
      <div className={styles.footer}>
        {type === 'edit' && (
          <div className={styles.btnWrapper}>
            <ActionBtn
              title='Delete'
              actionFunction={() => handleDeleteJobExperience()}
              overwriteStyle={{
                backgroundColor: '#FF4949',
                width: 'fit-content',
                padding: '8px',
              }}
            />
          </div>
        )}
        <div className={styles.btnWrapper}>
          <ActionBtn
            title={type === 'edit' ? 'Update' : 'Add'}
            actionFunction={() => {
              if (type === 'edit') {
                handleUpdateJobExperience();
              } else {
                handleAddJobExperience();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default JobExperienceForm;
