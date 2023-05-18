'use client';
import { useState } from 'react';
import styles from './searchBar.module.css';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import useOnclickOutside from 'react-cool-onclickoutside';

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

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    setFilteredData([]);
  });

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.searchBarWrapper}>
        <input
          type='text'
          className={styles.searchBar}
          value={searchValue}
          onChange={handleFilter}
          placeholder={placeholder}
        />

        {searchValue !== '' ? (
          <AiOutlineClose
            size={20}
            onClick={() => {
              setSearchValue('');
              setFilteredData([]);
            }}
          />
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
