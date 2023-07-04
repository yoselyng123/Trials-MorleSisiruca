import React from 'react';
import styles from './selectOption.module.css';

function SelectOption({ optionsList, title, value, setValue }) {
  return (
    <div className={styles.container}>
      <p className={styles.labelText}>{title}</p>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <option value='' disabled defaultValue>
          {optionsList[0]}
        </option>
        {optionsList.map((opt, index) => {
          if (index > 0) {
            return (
              <option defaultValue value={opt} key={index}>
                {opt}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
}

export default SelectOption;
