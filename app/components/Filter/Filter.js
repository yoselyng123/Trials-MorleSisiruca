import React, { useEffect, useState } from 'react';
import styles from './filter.module.css';
import {
  IoChevronDownSharp,
  IoFilter,
  IoChevronUpSharp,
} from 'react-icons/io5';
import useOnclickOutside from 'react-cool-onclickoutside';

function Filter({
  title,
  options,
  icon,
  setSelectedOption,
  selectedOption,
  overwriteStyle,
  filterOptionsStyle,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    setIsOpen(false);
  });

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  return (
    <div className={styles.container} ref={ref}>
      <div
        className={styles.filterWrapper}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        style={overwriteStyle}
      >
        {icon && <IoFilter size={20} color='#636889' />}
        <p className={styles.filterText}>
          {selectedOption !== '' ? selectedOption : title}
        </p>
        {isOpen ? (
          <IoChevronUpSharp size={20} color='#636889' />
        ) : (
          <IoChevronDownSharp size={20} color='#636889' />
        )}
      </div>
      {isOpen && (
        <div className={styles.filterOptionsWrapper} style={filterOptionsStyle}>
          {options.map((option, index) => (
            <div
              className={styles.filterOption}
              key={index}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
            >
              <p className={styles.filterOptionText}>{option}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Filter;
