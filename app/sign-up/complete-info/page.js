'use client';
import JobCategory from '@/app/components/JobCategory/JobCategory';
import styles from './completeInfo.module.css';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/src/context/AuthContext';
import { useRouter } from 'next/navigation';
/* Components */
import { jobCategories, expertiseAreas } from '@/src/data/data';
import SearchBar from '@/app/components/SearchBar/SearchBar';
import { updateUserProfessional } from '@/src/firebase/auth/signup';

function page() {
  //TODO: AGREGAR GUARD
  const router = useRouter();
  const { user, setUser } = useAuthContext();

  // Profile Info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [listJobCategories, setListJobCategories] = useState([]);
  const [listExpertiseAreas, setListExpertiseAreas] = useState([]);

  const [adjCvList, setAdjCvList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [jobExperienceList, setJobExperienceList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDeleteJob = (index) => {
    var copyOfListJobCategories = [...listJobCategories];
    copyOfListJobCategories.splice(index, 1);
    setListJobCategories(copyOfListJobCategories);
  };
  const handleDeleteExpertiseArea = (index) => {
    var copyOfListExpertiseArea = [...listExpertiseAreas];
    copyOfListExpertiseArea.splice(index, 1);
    setListExpertiseAreas(copyOfListExpertiseArea);
  };

  const userInputValidations = () => {
    //TODO: HACER VALIDACIONES
    return true;
  };

  const handleCulminateRegistration = async (event) => {
    event.preventDefault();
    const { userRefUpdate, errorUpdate, errorGetUpdate } =
      await updateUserProfessional(
        user,
        name,
        lastname,
        description,
        listJobCategories,
        listExpertiseAreas,
        phoneNumber,
        location,
        setLoading,
        educationList,
        jobExperienceList,
        adjCvList
      );

    if (userRefUpdate) {
      console.log(userRefUpdate);
      setUser(userRefUpdate);
      router.push('/');
    } else {
      console.log(errorUpdate);
      console.log(errorGetUpdate);
    }
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.formWrapper}
        onSubmit={handleCulminateRegistration}
      >
        <h3 className={styles.formTitle}>Complete info</h3>
        <label htmlFor='username' className={styles.labelText}>
          Name
        </label>
        <input
          type='text'
          placeholder='Jane'
          id='name'
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='username' className={styles.labelText}>
          Last Name
        </label>
        <input
          type='text'
          placeholder='Doe'
          id='lastname'
          className={styles.input}
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        <label htmlFor='password' className={styles.labelText}>
          Description
        </label>
        <input
          type='text'
          placeholder='Describe yourself'
          id='description'
          className={styles.inputDescription}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor='password' className={styles.labelText}>
          Job Categories
        </label>
        <SearchBar
          placeholder='Enter job categories of your interest'
          data={jobCategories}
          setSelectedData={setListJobCategories}
          selectedData={listJobCategories}
          overrideStyle={{ marginBottom: '15px' }}
        />

        <div className={styles.jobCategoriesWrapper}>
          {listJobCategories.map((job, index) => (
            <JobCategory
              key={index}
              title={job}
              index={index}
              handleDelete={handleDeleteJob}
            />
          ))}
        </div>
        <label htmlFor='password' className={styles.labelText}>
          Expertise Areas
        </label>
        <SearchBar
          placeholder='Enter expertise areas'
          data={expertiseAreas}
          setSelectedData={setListExpertiseAreas}
          selectedData={listExpertiseAreas}
          overrideStyle={{ marginBottom: '15px' }}
        />
        <div className={styles.jobCategoriesWrapper}>
          {listExpertiseAreas.map((job, index) => (
            <JobCategory
              key={index}
              title={job}
              index={index}
              handleDelete={handleDeleteExpertiseArea}
            />
          ))}
        </div>
        <button type='submit' className={styles.btnSignUp}>
          Continue
        </button>
      </form>
    </div>
  );
}

export default page;
