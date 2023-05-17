'use client';
import JobCategory from '@/app/components/JobCategory/JobCategory';
import styles from './completeInfo.module.css';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@/src/context/AuthContext';
import { useRouter } from 'next/navigation';
import { updateUserProfessional } from '@/src/firebase/auth/signup';

const jobCategories = [
  'Information Technology (IT)',
  'Sales and Marketing',
  'Health and Medicine',
  'Finance and Accounting',
  'Human Resources',
  'Education',
  'Engineering',
  'Customer Service',
  'Arts and Design',
  'Legal',
];

function page() {
  const router = useRouter();
  const { user, setUser } = useAuthContext();

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [description, setDescription] = useState('');
  const [listJobCategories, setListJobCategories] = useState([]);

  // useEffect(() => {
  //   if (user == null) router.push('/');
  // }, [user]);

  const handleSelectJob = (event) => {
    var copyOfListJobCategories = [...listJobCategories];
    if (
      copyOfListJobCategories.find(
        (element) => element === event.target.value
      ) !== event.target.value
    ) {
      copyOfListJobCategories.push(event.target.value);
      setListJobCategories(copyOfListJobCategories);
    }
  };

  const handleDeleteJob = (index) => {
    var copyOfListJobCategories = [...listJobCategories];
    copyOfListJobCategories.pop(index);
    setListJobCategories(copyOfListJobCategories);
  };

  const userInputValidations = () => {
    //TODO: HACER VALIDACIONES
    return true;
  };

  const handleCulminateRegistration = async (event) => {
    event.preventDefault();
    const { userRef, errorGet, errorUpdate } = await updateUserProfessional(
      user,
      name,
      lastname,
      description,
      listJobCategories
    );

    if (errorGet) {
      console.log(errorGet);
    } else {
      setUser(userRef);
      router.push('/');
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
        <div className={styles.selectWrapper}>
          <select
            name='categories'
            id='categories'
            className={styles.selectJobCategories}
            required
            value={listJobCategories.at(-1)}
            onChange={handleSelectJob}
          >
            <option disabled hidden>
              Select job categories of your interest
            </option>
            {jobCategories.map((element, index) => (
              <option value={element} key={index}>
                {element}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.jobCategoriesWrapper}>
          {listJobCategories.length > 0 &&
            listJobCategories.map((job, index) => (
              <JobCategory
                key={index}
                title={job}
                index={index}
                handleDelete={handleDeleteJob}
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
