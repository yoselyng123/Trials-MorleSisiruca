import React from 'react';
import styles from './pageOneCVForm.module.css';
import InputBox from '../InputBox/InputBox';
import Filter from '../Filter/Filter';
import { countryList } from '@/src/data/data';

function PageOneCVForm({
  fullName,
  description,
  setDescription,
  location,
  setLocation,
  phoneNumber,
  occupation,
  setOccupation,
}) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Personal Info</p>
      <div className={styles.topContainer}>
        <div className={styles.topLeftContainer}>
          <InputBox
            value={fullName}
            placeholder='Jane Doe'
            label='Full Name'
            disabled={true}
            overWriteStyle={{
              padding: '0px 8px',
            }}
          />
          <InputBox
            value={phoneNumber}
            placeholder='+584142331302'
            label='Phone Number'
            disabled={true}
            overWriteStyle={{
              padding: '8px',
            }}
          />
        </div>
        <div className={styles.topRightContainer}>
          <InputBox
            value={occupation}
            setValue={setOccupation}
            placeholder='Ex: Software Engineer'
            label='Occupation'
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
      </div>
      <div className={styles.bottomContainer}>
        <InputBox
          value={description}
          setValue={setDescription}
          placeholder='Enter your personal description'
          label='Description'
          isTextArea={true}
        />
      </div>
    </div>
  );
}

export default PageOneCVForm;
