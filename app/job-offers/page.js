'use client';
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import styles from './jobOffers.module.css';
import { deleteJob, getJobsListByCompany } from '@/src/firebase/firestore/job';
import ActionBtn from '../components/ActionBtn/ActionBtn';
import JobCard from '../components/JobCard/JobCard';
import Modal from '../components/Modal/Modal';
import { useAuthContext } from '@/src/context/AuthContext';
import EditJob from '../components/EditJob/EditJob';

function pages() {
  const [search, setSearch] = useState('');
  const [openJobsList, setOpenJobsList] = useState([]);
  const [closedJobsList, setClosedJobsList] = useState([]);
  const [notAcceptingJobsList, setNotAcceptingJobsList] = useState([]);

  const [jobsTitlesList, setJobsTitlesList] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [currentPagination, setCurrentPagination] = useState('Active Jobs');

  const [modalOpen, setModalOpen] = useState(false);
  const [clickedJob, setClickedJob] = useState({});

  const [updateJobBtnClick, setUpdateJobBtnClick] = useState(false);
  const [deleteJobBtnClick, setDeleteJobBtnClick] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    handleGetJobsList();
  }, [user, updateJobBtnClick]);

  useEffect(() => {
    if (deleteJobBtnClick) {
      handleDeleteJob(clickedJob);
    }
  }, [deleteJobBtnClick]);

  const handleDeleteJob = async (job) => {
    const deleteError = await deleteJob(job);

    if (!deleteError) {
      alert('Se ha eliminado el trabajo con exito!');
      setModalOpen(close);
      handleGetJobsList();
    }
  };

  const handleGetJobsList = async () => {
    const { jobsListRef, errorGet } = await getJobsListByCompany(user);

    if (jobsListRef) {
      var copyOfOpenJobs = [];
      var copyOfClosedJobs = [];
      var copyOfNotAcceptingJobs = [];
      const jobsTitles = jobsListRef.map((job) => {
        if (job.state === 'open') {
          copyOfOpenJobs.push(job);
        } else if (job.state === 'closed') {
          copyOfClosedJobs.push(job);
        } else {
          copyOfNotAcceptingJobs.push(job);
        }
        return job.title;
      });

      setJobsTitlesList(jobsTitles);
      setOpenJobsList(copyOfOpenJobs);
      setClosedJobsList(copyOfClosedJobs);
      setNotAcceptingJobsList(copyOfNotAcceptingJobs);
      setFilteredJobs(
        getCurrentPaginationList(
          copyOfOpenJobs,
          copyOfClosedJobs,
          copyOfNotAcceptingJobs
        )
      );
    }
  };

  const getCurrentPaginationList = (
    openJobsList,
    closedJobsList,
    notAcceptingJobsList
  ) => {
    var result = [];

    if (currentPagination === 'Active Jobs') {
      result = openJobsList;
    } else if (currentPagination === 'Inactive Jobs') {
      result = notAcceptingJobsList;
    } else {
      result = closedJobsList;
    }

    return result;
  };

  const handleSearch = () => {
    var result = getCurrentPaginationList(
      openJobsList,
      closedJobsList,
      notAcceptingJobsList
    );

    if (search !== '') {
      result = result.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (search === '') {
      setFilteredJobs(
        getCurrentPaginationList(
          openJobsList,
          closedJobsList,
          notAcceptingJobsList
        )
      );
    } else {
      setFilteredJobs(result);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <SearchBar
          placeholder='Job title or keyword'
          data={jobsTitlesList}
          setSelectedData={setSearch}
          selectedData={search}
          oneOption={true}
        />
        <div className={styles.searchBtnWrapper}>
          <ActionBtn title='Search' actionFunction={handleSearch} />
        </div>
      </div>
      <div className={styles.paginationListWrapper}>
        <button
          className={styles.paginationWrapper}
          onClick={() => {
            setCurrentPagination('Active Jobs');
            setFilteredJobs(openJobsList);
          }}
          style={
            currentPagination === 'Active Jobs'
              ? { borderBottom: '2px solid #D4B200' }
              : { borderBottom: '2px solid transparent' }
          }
        >
          <p className={styles.paginationText}>ACTIVE JOBS</p>
        </button>
        <button
          className={styles.paginationWrapper}
          onClick={() => {
            setCurrentPagination('Inactive Jobs');
            setFilteredJobs(notAcceptingJobsList);
          }}
          style={
            currentPagination === 'Inactive Jobs'
              ? { borderBottom: '2px solid #D4B200' }
              : { borderBottom: '2px solid transparent' }
          }
        >
          <p className={styles.paginationText}>INACTIVE JOBS</p>
        </button>
        <button
          className={styles.paginationWrapper}
          onClick={() => {
            setCurrentPagination('Closed Jobs');
            setFilteredJobs(closedJobsList);
          }}
          style={
            currentPagination === 'Closed Jobs'
              ? { borderBottom: '2px solid #D4B200' }
              : { borderBottom: '2px solid transparent' }
          }
        >
          <p className={styles.paginationText}>CLOSED JOBS</p>
        </button>
      </div>
      <p className={styles.pageTitle}>
        {filteredJobs.length} {currentPagination}
      </p>
      <div className={styles.cardListWrapper}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <JobCard
              job={job}
              key={index}
              setClickedJob={setClickedJob}
              setModalOpen={setModalOpen}
            />
          ))
        ) : (
          <p>No results</p>
        )}
      </div>

      {/* Modal */}
      {modalOpen && clickedJob && (
        <Modal
          setIsOpen={setModalOpen}
          modalContent={
            <EditJob
              clickedJob={clickedJob}
              updateJobBtnClick={updateJobBtnClick}
              setUpdateJobBtnClick={setUpdateJobBtnClick}
              setDeleteJobBtnClick={setDeleteJobBtnClick}
            />
          }
          overwriteStyle={{
            width: '75vw',
            height: '90vh',
          }}
          overWriteStyleModalContent={{
            padding: '0px',
          }}
        />
      )}
    </div>
  );
}

export default pages;
