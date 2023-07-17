import React, { useEffect, useState } from 'react';
import styles from './educationForm.module.css';
import InputBox from '../InputBox/InputBox';
import Filter from '../Filter/Filter';
import ActionBtn from '../ActionBtn/ActionBtn';
import { countryList } from '@/src/data/data';
import AchievementsList from '../AchievementsList/AchievementsList';

function EducationForm({
  educationList,
  setEducationList,
  setModalOpen,
  type,
  clickedEducation,
}) {
  const [schoolName, setSchoolName] = useState('');
  const [degree, setDegree] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  const [achievements, setAchievements] = useState([]);
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (type === 'edit') {
      setSchoolName(clickedEducation?.schoolName);
      setDegree(clickedEducation?.degree);
      setStartMonth(clickedEducation?.startMonth);
      setStartYear(clickedEducation?.startYear);
      setEndMonth(clickedEducation?.endMonth);
      setEndYear(clickedEducation?.endYear);
      setFieldOfStudy(clickedEducation?.fieldOfStudy);
      setLocation(clickedEducation?.location);
      if (clickedEducation?.achievements) {
        setAchievements(clickedEducation?.achievements);
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

  const handleAddEducation = () => {
    const copyOfEducationList = educationList;

    copyOfEducationList.push({
      schoolName,
      degree,
      achievements,
      startMonth,
      startYear,
      endMonth,
      endYear,
      fieldOfStudy,
      location,
      id: copyOfEducationList.length + 1,
    });

    setEducationList(copyOfEducationList);
    setModalOpen(false);
  };

  const handleDeleteEducation = () => {
    const copyOfEducationList = educationList;

    var indexOfEducation = copyOfEducationList
      .map((education) => education.id)
      .indexOf(clickedEducation.id);

    if (indexOfEducation > -1) {
      copyOfEducationList.splice(indexOfEducation, 1);
    }

    setEducationList(copyOfEducationList);
    setModalOpen(false);
  };

  const handleUpdateEducation = () => {
    const copyOfEducationList = educationList;

    var indexOfEducation = copyOfEducationList
      .map((education) => education.id)
      .indexOf(clickedEducation.id);

    if (indexOfEducation > -1) {
      copyOfEducationList.splice(indexOfEducation, 1);
    }

    copyOfEducationList.push({
      schoolName,
      degree,
      achievements,
      startMonth,
      startYear,
      endMonth,
      endYear,
      fieldOfStudy,
      location,
      id: copyOfEducationList.length + 1,
    });

    setEducationList(copyOfEducationList);
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div>
          <InputBox
            value={schoolName}
            setValue={setSchoolName}
            placeholder='Ex: Universidad Metropolitana'
            label='School'
            overWriteStyle={{
              padding: '8px',
            }}
          />
        </div>
        <div>
          <InputBox
            value={degree}
            setValue={setDegree}
            placeholder='Ex: Bachelor'
            label='Degree'
            overWriteStyle={{
              padding: '8px',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <InputBox
            value={fieldOfStudy}
            setValue={setFieldOfStudy}
            placeholder='Ex: Software Engineer'
            label='Field of study'
            overWriteStyle={{
              padding: '8px',
            }}
          />
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
      </div>

      <div className={styles.footer}>
        {type === 'edit' && (
          <div className={styles.btnWrapper}>
            <ActionBtn
              title='Delete'
              actionFunction={() => handleDeleteEducation()}
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
                handleUpdateEducation();
              } else {
                handleAddEducation();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default EducationForm;
