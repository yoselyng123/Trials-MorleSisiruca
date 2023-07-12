import React, { useState } from 'react';
import styles from './pageThreeCVForm.module.css';
import InputBox from '../InputBox/InputBox';
import JobCategory from '../JobCategory/JobCategory';
import ActionBtn from '../ActionBtn/ActionBtn';

function PageThreeCVForm({ skillsList, setSkillsList }) {
  const [newSkill, setNewSkill] = useState('');

  const handleDeleteSkill = (index) => {
    var copyOfSkillsList = [...skillsList];
    copyOfSkillsList.splice(index, 1);
    setSkillsList(copyOfSkillsList);
  };

  const handleAddSkill = () => {
    var copyOfSkillsList = skillsList;
    copyOfSkillsList.push(newSkill);
    setSkillsList(copyOfSkillsList);
    setNewSkill('');
  };

  return (
    <div className={StyleSheet.container}>
      <p className={styles.title}>Skills</p>
      <div className={styles.InputWrapper}>
        <InputBox
          value={newSkill}
          setValue={setNewSkill}
          placeholder='Ex: Teamwork'
          label='Skills'
          overWriteStyle={{
            padding: '8px',
          }}
        />
        <div className={styles.btnWrapper}>
          <ActionBtn title='Add' actionFunction={handleAddSkill} />
        </div>
      </div>
      <div className={styles.jobCategoriesWrapper}>
        {skillsList.map((skill, index) => (
          <JobCategory
            key={index}
            title={skill}
            index={index}
            handleDelete={handleDeleteSkill}
            backgroundColor={true}
          />
        ))}
      </div>
    </div>
  );
}

export default PageThreeCVForm;
