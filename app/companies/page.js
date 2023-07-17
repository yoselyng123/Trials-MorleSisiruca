'use client';
import React, { useEffect, useState } from 'react';
import styles from './companies.module.css';
import { countryList, expertiseAreas } from '@/src/data/data';
import { getUserByRole } from '@/src/firebase/firestore/company';
import SearchCard from '../components/SearchCard/SearchCard';
import SearchBar from '../components/SearchBar/SearchBar';
import Filter from '../components/Filter/Filter';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/src/context/AuthContext';

function page() {
  const [companyList, setCompanyList] = useState([]);
  const [companyNamesList, setCompanyNamesList] = useState([]);
  const [filteredCompanyList, setFilteredCompanyList] = useState([]);

  const [searchCompanyTitle, setSearchCompanyTitle] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedExpertiseArea, setSelectedExpertiseArea] = useState('');

  const router = useRouter();

  const { user } = useAuthContext();

  useEffect(() => {
    handleGetCompanyList();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  const handleGetCompanyList = async () => {
    const { companyListRef, errorGet } = await getUserByRole('Company');

    if (companyListRef) {
      setCompanyList(companyListRef);
      setFilteredCompanyList(companyListRef);

      const companiesNames = companyListRef.map((company) => {
        return company.name;
      });

      setCompanyNamesList(companiesNames);
    }
  };

  const handleClearFilters = () => {
    setSearchCompanyTitle('');
    setSelectedCountry('');
    setSelectedExpertiseArea('');
  };

  const handleSearch = () => {
    let result = companyList;

    if (searchCompanyTitle !== '') {
      result = result.filter((company) =>
        company.name.toLowerCase().includes(searchCompanyTitle.toLowerCase())
      );
    }
    if (selectedCountry !== '') {
      result = result.filter((company) =>
        company.location.toLowerCase().includes(selectedCountry.toLowerCase())
      );
    }
    if (selectedExpertiseArea !== '') {
      result = result.filter((company) =>
        company.listExpertiseAreas.find(
          (expertise) =>
            expertise.toLowerCase() ===
            selectedExpertiseArea.toLocaleLowerCase()
        )
      );
    }

    if (
      searchCompanyTitle === '' &&
      selectedCountry === '' &&
      selectedExpertiseArea === ''
    ) {
      setFilteredCompanyList(companyList);
    } else {
      setFilteredCompanyList(result);
    }
  };

  useEffect(() => {
    if (
      searchCompanyTitle === '' &&
      selectedCountry === '' &&
      selectedExpertiseArea === ''
    ) {
      handleSearch();
    }
  }, [searchCompanyTitle, selectedCountry, selectedExpertiseArea]);

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.TopWrapper}>
          <h4 className={styles.pageTitle}>Companies List</h4>
          {/* SearchBar */}
          <div className={styles.SearchBarWrapper}>
            <SearchBar
              placeholder='Company name'
              data={companyNamesList}
              setSelectedData={setSearchCompanyTitle}
              selectedData={searchCompanyTitle}
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
                options={expertiseAreas}
                setSelectedOption={setSelectedExpertiseArea}
                selectedOption={selectedExpertiseArea}
              />
              <Filter
                title='Location'
                options={countryList}
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

        {/* Companies List */}
        <div className={styles.companiesListWrapper}>
          <div className={styles.companiesListWrapperTop}>
            <p className={styles.companiesQuantityText}>
              {filteredCompanyList.length} results
            </p>
          </div>
          {filteredCompanyList.length > 0 ? (
            filteredCompanyList.map((company, index) => (
              <SearchCard name={company.name} searchObj={company} key={index} />
            ))
          ) : (
            <p>No results</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
