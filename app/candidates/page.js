'use client';
import React, { useEffect, useState } from 'react';
import styles from './candidates.module.css';
import { countryList, expertiseAreas } from '@/src/data/data';
import { getUserByRole } from '@/src/firebase/firestore/company';
import SearchCard from '../components/SearchCard/SearchCard';
import SearchBar from '../components/SearchBar/SearchBar';
import Filter from '../components/Filter/Filter';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/src/context/AuthContext';
import UserPreview from '../components/UserPreview/UserPreview';
import Modal from '../components/Modal/Modal';

function page() {
  const [candidatesList, setCandidatesList] = useState([]);
  const [candidatesNamesList, setCandidatesNamesList] = useState([]);
  const [filteredCandidatesList, setFilteredCandidatesList] = useState([]);

  const [searchCandidateName, setSearchCandidateName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedExpertiseArea, setSelectedExpertiseArea] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [clickedUser, setClickedUser] = useState({});

  const router = useRouter();

  const { user } = useAuthContext();

  useEffect(() => {
    handleGetCandidatesList();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  useEffect(() => {
    if (
      searchCandidateName === '' &&
      selectedCountry === '' &&
      selectedExpertiseArea === ''
    ) {
      handleSearch();
    }
  }, [searchCandidateName, selectedCountry, selectedExpertiseArea]);

  const handleGetCandidatesList = async () => {
    const { companyListRef, errorGet } = await getUserByRole('Professional');

    if (companyListRef) {
      setCandidatesList(companyListRef);
      setFilteredCandidatesList(companyListRef);

      const candidatesNames = companyListRef.map((candidate) => {
        console.log(`${candidate.name} ${candidate.lastname}`);
        return `${candidate.name} ${candidate.lastname}`;
      });

      setCandidatesNamesList(candidatesNames);
    }
  };

  const handleClearFilters = () => {
    setSearchCandidateName('');
    setSelectedCountry('');
    setSelectedExpertiseArea('');
  };

  const handleSearch = () => {
    let result = candidatesList;

    if (searchCandidateName !== '') {
      result = result.filter((candidate) =>
        candidate.name.toLowerCase().includes(searchCandidateName.toLowerCase())
      );
    }
    if (selectedCountry !== '') {
      result = result.filter((candidate) =>
        candidate.location.toLowerCase().includes(selectedCountry.toLowerCase())
      );
    }
    if (selectedExpertiseArea !== '') {
      result = result.filter((candidate) =>
        candidate.listExpertiseAreas.find(
          (expertise) =>
            expertise.toLowerCase() ===
            selectedExpertiseArea.toLocaleLowerCase()
        )
      );
    }

    if (
      searchCandidateName === '' &&
      selectedCountry === '' &&
      selectedExpertiseArea === ''
    ) {
      setFilteredCandidatesList(candidatesList);
    } else {
      setFilteredCandidatesList(result);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.TopWrapper}>
          <h4 className={styles.pageTitle}>Candidates List</h4>
          {/* SearchBar */}
          <div className={styles.SearchBarWrapper}>
            <SearchBar
              placeholder='Candidate name'
              data={candidatesNamesList}
              setSelectedData={setSearchCandidateName}
              selectedData={searchCandidateName}
              oneOption={true}
            />

            <div
              className={styles.searchBtnWrapper}
              onClick={() => handleSearch()}
            >
              <p>Search</p>
            </div>
          </div>
          {/* Filters */}
          <div className={styles.filtersWrapper}>
            <div className={styles.filtersWrapperRight}>
              <Filter
                title='Specialty'
                options={expertiseAreas.sort()}
                setSelectedOption={setSelectedExpertiseArea}
                selectedOption={selectedExpertiseArea}
              />
              <Filter
                title='Location'
                options={countryList.sort()}
                setSelectedOption={setSelectedCountry}
                selectedOption={selectedCountry}
              />
            </div>
            <p
              onClick={() => handleClearFilters()}
              className={styles.clearAllBtn}
            >
              Clear filters
            </p>
          </div>
        </div>

        {/* Candidates List */}
        <div className={styles.candidatesListWrapper}>
          <div className={styles.candidatesListWrapperTop}>
            <p className={styles.candidatesQuantityText}>
              {filteredCandidatesList.length} results
            </p>
          </div>
          {filteredCandidatesList.length > 0 ? (
            filteredCandidatesList.map((candidate, index) => (
              <SearchCard
                name={`${candidate.name} ${candidate.lastname}`}
                searchObj={candidate}
                key={index}
                setClickedElement={setClickedUser}
                setModalOpen={setModalOpen}
              />
            ))
          ) : (
            <p>No results</p>
          )}
        </div>
        {/* Modal */}
        {modalOpen && clickedUser && (
          <Modal
            setIsOpen={setModalOpen}
            modalContent={<UserPreview clickedUser={clickedUser} />}
          />
        )}
      </div>
    </div>
  );
}

export default page;
