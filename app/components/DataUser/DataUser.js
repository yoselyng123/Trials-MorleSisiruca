import styles from './dataUser.module.css';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/src/context/AuthContext';
import {
  updateUserProfessional,
  uploadImage,
} from '@/src/firebase/auth/signup';
import { expertiseAreas, jobCategories } from '@/src/data/data';
import { useLoadScript } from '@react-google-maps/api';
import InputBox from '../InputBox/InputBox';
import SearchBar from '../SearchBar/SearchBar';
import JobCategory from '../JobCategory/JobCategory';
import Places from '../Places/Places';
import Map from '../Map/Map';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';

function DataUser({ saveBtnClick, setSaveBtnClick, loading, setLoading }) {
  const [libraries] = useState(['places']);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [listJobCategories, setListJobCategories] = useState([]);
  const [listExpertiseAreas, setListExpertiseAreas] = useState([]);

  const [picture, setPicture] = useState(null);
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setLastname(user.lastname);
      setDescription(user.description);
      setListExpertiseAreas(user.listExpertiseAreas);
      setListJobCategories(user.jobCategories);
      setPhoneNumber(user.phoneNumber);
      setLocation(user.location);
      if (user?.profilePic) {
        setProfilePic(user.profilePic);
      }
    }
  }, []);

  useEffect(() => {
    if (saveBtnClick) {
      handleUpdateUserInfo();
    }
  }, [saveBtnClick]);

  const handleUpdateUserInfo = async () => {
    setSaveBtnClick(false);
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
        picture
      );

    if (userRefUpdate) {
      console.log(userRefUpdate);
      setUser(userRefUpdate);
      alert('USER UPDATED SUCCESSFULLY');
      setPicture(null);
    } else {
      alert(errorUpdate);
      alert(errorGetUpdate);
      console.log('No userRefUpdate in DataUser');
    }
  };
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

  return (
    <div className={styles.container}>
      <ProfileAvatar
        profilePic={profilePic}
        setProfilePic={setProfilePic}
        picture={picture}
        setPicture={setPicture}
      />

      <div className={styles.inputWrapper}>
        <div className={styles.inputWrapperLeft}>
          <InputBox
            value={email}
            setValue={setEmail}
            placeholder='Enter the email of the company'
            label='Email'
            disabled={true}
          />
          <InputBox
            value={name}
            setValue={setName}
            placeholder='Enter your name '
            label='Name'
          />
          <InputBox
            value={lastname}
            setValue={setLastname}
            placeholder='Enter your last name'
            label='Last Name'
          />
          <InputBox
            value={description}
            setValue={setDescription}
            placeholder='Enter your description'
            label='Description'
          />
          <InputBox
            value={phoneNumber}
            setValue={setPhoneNumber}
            placeholder='example: +584127664'
            label='Phone Number'
          />
          <p htmlFor='password' className={styles.labelText}>
            Job Categories
          </p>
          <SearchBar
            placeholder='Enter job categories of your interest'
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
                handleDelete={handleDeleteJob}
                backgroundColor={true}
              />
            ))}
          </div>
        </div>
        <div className={styles.inputWrapperRight}>
          <p htmlFor='password' className={styles.labelText}>
            Expertise Areas
          </p>
          <SearchBar
            placeholder='Enter expertise areas'
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
          {isLoaded && (
            <>
              <p className={styles.labelText}>Location</p>
              <Places
                setLocation={setLocation}
                setMapCoordinates={setMapCoordinates}
                location={location}
              />
              <Map
                mapCoordinates={mapCoordinates}
                setMapCoordinates={setMapCoordinates}
                setLocation={setLocation}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataUser;
