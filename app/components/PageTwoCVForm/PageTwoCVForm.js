import React from 'react';
import styles from './pageTwoCVForm.module.css';
import { IoAddOutline } from 'react-icons/io5';
import { BiPencil } from 'react-icons/bi';
import EducationCard from '../EducationCard/EducationCard';
import EducationSection from '../EducationSection/EducationSection';
import JobExperienceSection from '../JobExperienceSection/JobExperienceSection';

function PageTwoCVForm({ content, title }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      {content}
    </div>
  );
}

export default PageTwoCVForm;
