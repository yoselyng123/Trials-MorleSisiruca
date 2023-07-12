import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import styles from './achievementsList.module.css';
import InputBox from '../InputBox/InputBox';
import { IoAddOutline } from 'react-icons/io5';

function AchievementsList({ achievements, setAchievements }) {
  const [newAchievement, setNewAchievement] = useState('');

  const handleAddAchievement = () => {
    const copyOfAchievements = achievements;
    copyOfAchievements.push(newAchievement);
    setAchievements(copyOfAchievements);
    setNewAchievement('');
  };

  const handleDeleteAchievement = (index) => {
    const copyOfAchievements = [...achievements];

    copyOfAchievements.splice(index, 1);

    setAchievements(copyOfAchievements);
  };

  return (
    <>
      <div className={styles.row}>
        <InputBox
          value={newAchievement}
          setValue={setNewAchievement}
          placeholder='Ex: Processed over 200 requests for repair or replacement.'
          label='Achievements'
          overWriteStyle={{
            padding: '8px',
          }}
        />
        <div
          className={styles.cvIconAddWrapper}
          onClick={() => handleAddAchievement()}
        >
          <IoAddOutline size={25} color='#9596A9' />
        </div>
      </div>
      <div className={styles.achievementsWrapper}>
        {achievements?.map((achievement, index) => (
          <div className={styles.achievementWrapper}>
            <p key={index} className={styles.achievementText}>
              - {achievement}
            </p>
            <div
              className={styles.cvIconAddWrapper}
              onClick={() => handleDeleteAchievement(index)}
            >
              <AiFillDelete size={16} color='#9596A9' />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AchievementsList;
