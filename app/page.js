'use client';
import { useAuthContext } from '@/src/context/AuthContext';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import JobOffer from './components/JobOffer/JobOffer';
import { getJobsListByState } from '@/src/firebase/firestore/job';
import { getUserByRole } from '@/src/firebase/firestore/company';
import Modal from './components/Modal/Modal';
import SearchBar from './components/SearchBar/SearchBar';
import { jobCategories, countryList, paymentRange } from '@/src/data/data';
import Filter from './components/Filter/Filter';
import JobDetail from './components/JobDetail/JobDetail';

export default function Home() {
  const { user } = useAuthContext();

  const [jobsList, setJobsList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [jobsTitlesList, setJobsTitlesList] = useState([]);
  const [companyNamesList, setCompanyNamesList] = useState([]);
  const [clickedCompany, setClickedCompany] = useState({});
  const [clickedJob, setClickedJob] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const [searchJobTitle, setSearchJobTitle] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPaymentRange, setSelectedPaymentRange] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    handleGetJobsList();
    handleGetCompanyList();
  }, []);

  const handleGetJobsList = async () => {
    const { jobsListRef, errorGet } = await getJobsListByState('open');

    if (jobsListRef) {
      setJobsList(jobsListRef);
      setFilteredJobs(jobsListRef);
      var refJobsPayRange = [];
      const jobsTitles = jobsListRef.map((job) => {
        refJobsPayRange.push(job.paymentRange);
        return job.title;
      });

      setJobsTitlesList(jobsTitles);
    }
  };
  const handleGetCompanyList = async () => {
    const { companyListRef, errorGet } = await getUserByRole('Company');

    if (companyListRef) {
      setCompanyList(companyListRef);
      const companyNames = companyListRef.map((company) => {
        return company.name;
      });

      setCompanyNamesList(companyNames);
    }
  };

  const handleClearFilters = () => {
    setSearchJobTitle('');
    setSearchCountry('');
    setSelectedCategory('');
    setSelectedPaymentRange('');
    setSelectedJobType('');
    setSelectedExperienceLevel('');
    setSelectedCompany('');
  };

  const handleSearch = () => {
    let result = jobsList;

    if (user) {
      if (selectedExperienceLevel !== '') {
        result = result.filter(
          (job) =>
            job.experienceLevel?.toLowerCase() ===
            selectedExperienceLevel.toLowerCase()
        );
      }
      if (selectedJobType !== '') {
        result = result.filter(
          (job) => job.jobType.toLowerCase() === selectedJobType.toLowerCase()
        );
      }
      if (selectedCompany !== '') {
        result = result.filter(
          (job) =>
            selectedCompany ===
            companyList.find((company) => company.uid === job.companyID).name
        );
      }
    }

    if (searchJobTitle !== '') {
      result = result.filter((job) =>
        job.title.toLowerCase().includes(searchJobTitle.toLowerCase())
      );
    }
    if (searchCountry !== '') {
      result = result.filter(
        (job) => job.location.toLowerCase() === searchCountry.toLowerCase()
      );
    }
    if (selectedCategory !== '') {
      result = result.filter((job) =>
        job.jobCategories.find(
          (category) =>
            category.toLowerCase() === selectedCategory.toLocaleLowerCase()
        )
      );
    }
    if (selectedPaymentRange !== '') {
      const [rangeStart, rangeEnd] = selectedPaymentRange.split('-');
      result = result.filter((job) => {
        const [jobRangeStart, jobRangeEnd] = job.paymentRange.split('-');
        return rangeStart >= jobRangeStart && rangeEnd <= jobRangeEnd;
      });
    }

    if (
      searchJobTitle === '' &&
      searchCountry === '' &&
      selectedCategory === '' &&
      selectedPaymentRange === '' &&
      selectedCompany === '' &&
      selectedExperienceLevel === '' &&
      selectedJobType === ''
    ) {
      setFilteredJobs(jobsList);
    } else {
      setFilteredJobs(result);
    }
  };

  // useEffect(() => {
  //   handleSearch();
  // }, [searchJobTitle, searchCountry, selectedCategory, selectedPaymentRange]);

  return (
    <main className={styles.main}>
      <div className={styles.contentWrapper}>
        <div className={styles.TopWrapper}>
          <h4 className={styles.pageTitle}>Job Listings</h4>
          <p className={styles.pageDescription}>
            Your gateway to a world of exciting career opportunities. Discover
            the perfect fit for your skills and aspirations.
          </p>
          {/* SearchBar */}
          <div className={styles.SearchBarWrapper}>
            <SearchBar
              placeholder='job title or keyword'
              data={jobsTitlesList}
              setSelectedData={setSearchJobTitle}
              selectedData={searchJobTitle}
              oneOption={true}
            />
            <SearchBar
              placeholder='country'
              data={countryList}
              setSelectedData={setSearchCountry}
              selectedData={searchCountry}
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
                title='Job categories'
                options={jobCategories}
                setSelectedOption={setSelectedCategory}
                selectedOption={selectedCategory}
              />
              <Filter
                title='Payment range'
                options={paymentRange}
                setSelectedOption={setSelectedPaymentRange}
                selectedOption={selectedPaymentRange}
              />
              {user && (
                <>
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
                    setSelectedOption={setSelectedExperienceLevel}
                    selectedOption={selectedExperienceLevel}
                  />
                  <Filter
                    title='Job Type'
                    options={['Full-Time', 'Part-Time', 'Remote']}
                    setSelectedOption={setSelectedJobType}
                    selectedOption={selectedJobType}
                  />
                  <Filter
                    title='Company'
                    options={companyNamesList}
                    setSelectedOption={setSelectedCompany}
                    selectedOption={selectedCompany}
                  />
                </>
              )}
            </div>

            <p
              onClick={() => handleClearFilters()}
              className={styles.clearAllBtn}
            >
              Clear filters
            </p>
          </div>
        </div>

        {/* Jobs List */}
        <div className={styles.jobsListWrapper}>
          <div className={styles.jobListWrapperTop}>
            <p className={styles.jobQuantityText}>{filteredJobs.length} jobs</p>
          </div>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <JobOffer
                key={index}
                job={job}
                setModalOpen={setModalOpen}
                setClickedCompany={setClickedCompany}
                setClickedJob={setClickedJob}
              />
            ))
          ) : (
            <p>No results</p>
          )}
        </div>
        {/* Modal */}
        {modalOpen && clickedCompany && clickedJob && (
          <Modal
            setIsOpen={setModalOpen}
            modalContent={
              <JobDetail
                clickedCompany={clickedCompany}
                clickedJob={clickedJob}
              />
            }
          />
        )}
      </div>
    </main>
  );
}
