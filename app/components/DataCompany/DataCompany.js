import styles from './dataCompany.module.css';
import { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Places from '../Places/Places';
import Map from '../Map/Map';
import InputBox from '../InputBox/InputBox';
import { useAuthContext } from '@/src/context/AuthContext';
import { updateUserCompany, uploadImage } from '@/src/firebase/auth/signup';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import JobCategory from '../JobCategory/JobCategory';
import SearchBar from '../SearchBar/SearchBar';
import { expertiseAreas } from '@/src/data/data';

function DataCompany({ saveBtnClick, setSaveBtnClick, loading, setLoading }) {
  const [libraries] = useState(['places']);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [webUrl, setWebUrl] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [listExpertiseAreas, setListExpertiseAreas] = useState([]);

  const [mapCoordinates, setMapCoordinates] = useState(null);

  const [picture, setPicture] = useState(null);
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setLocation(user.location);
      setWebUrl(user.webUrl);
      if (user?.listExpertiseAreas) {
        setListExpertiseAreas(user.listExpertiseAreas);
      }
      if (user?.profilePic) {
        setProfilePic(user.profilePic);
      }
      if (user?.companySize) {
        setCompanySize(user.companySize);
      }
    }
  }, [user]);

  useEffect(() => {
    if (saveBtnClick) {
      handleUpdateUserInfo();
      setPicture(null);
    }
  }, [saveBtnClick]);

  const handleDeleteExpertiseArea = (index) => {
    var copyOfListExpertiseArea = [...listExpertiseAreas];
    copyOfListExpertiseArea.splice(index, 1);
    setListExpertiseAreas(copyOfListExpertiseArea);
  };

  const handleUpdateUserInfo = async () => {
    setSaveBtnClick(false);
    const { userRefUpdate, errorUpdate, errorGetUpdate } =
      await updateUserCompany(
        user,
        name,
        location,
        webUrl,
        listExpertiseAreas,
        companySize,
        setLoading,
        picture
      );

    if (userRefUpdate) {
      console.log(userRefUpdate);
      setUser(userRefUpdate);
      alert('USER UPDATED SUCCESSFULLY');
    } else {
      alert(errorUpdate);
      alert(errorGetUpdate);
      console.log('No userRefUpdate in DataCompany');
    }
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
            placeholder='Enter the name of the company'
            label='Company Name'
          />
          <InputBox
            value={webUrl}
            setValue={setWebUrl}
            placeholder='Enter the web url of the company'
            label='Web Url'
          />
          <InputBox
            value={companySize}
            setValue={setCompanySize}
            placeholder='400-500'
            label='Company Size Range'
          />
          <p className={styles.labelText}>Related Expertise Areas</p>
          <SearchBar
            placeholder='Enter expertise areas'
            data={expertiseAreas}
            setSelectedData={setListExpertiseAreas}
            selectedData={listExpertiseAreas}
            overrideStyle={{ marginBottom: '10px' }}
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
        </div>
        <div className={styles.inputWrapperRight}>
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

export default DataCompany;
