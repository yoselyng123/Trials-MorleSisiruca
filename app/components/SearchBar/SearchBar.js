'use client';
import { useState } from 'react';
import styles from './searchBar.module.css';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

function SearchBar({ placeholder, data, setSelectedData, selectedData }) {
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (e) => {
    setSearchValue(e.target.value);

    const newFilter = data.filter((value) => {
      return value.toLowerCase().includes(e.target.value.toLowerCase());
    });

    if (e.target.value === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleSelectData = (element) => {
    const copySelectedData = [...selectedData];
    if (copySelectedData.find((data) => data === element) !== element) {
      copySelectedData.push(element);
      setSelectedData(copySelectedData);
      setSearchValue('');
      setFilteredData([]);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <div className={styles.container} onMouseLeave={() => setFilteredData([])}>
      <div className={styles.searchBarWrapper}>
        <input
          type='text'
          className={styles.searchBar}
          value={searchValue}
          onChange={handleFilter}
          placeholder={placeholder}
        />

        {searchValue !== '' ? (
          <AiOutlineClose size={20} />
        ) : (
          <AiOutlineSearch size={22} />
        )}
      </div>

      {filteredData.length !== 0 && (
        <div className={styles.searchResultsWrapper}>
          {filteredData.slice(0, 10).map((element, index) => (
            <div
              key={index}
              className={styles.searchResult}
              onClick={() => handleSelectData(element)}
            >
              <p>{element}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
