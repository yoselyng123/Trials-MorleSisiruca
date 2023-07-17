import React from 'react';
import styles from './confirmationPrompt.module.css';
import ActionBtn from '../ActionBtn/ActionBtn';

function ConfirmationPrompt({
  setPromptClicked,
  setModalOpen,
  setModalPromptOpen,
}) {
  const handleNoOption = () => {
    setPromptClicked('no');
    setModalOpen(false);
    setModalPromptOpen(false);
  };
  const handleYesOption = () => {
    setPromptClicked('yes');
    setModalOpen(true);
    setModalPromptOpen(false);
  };

  return (
    <div className={styles.container}>
      <p>
        Would you like to send a message to applicants before closing this job
        offer?
      </p>
      <div className={styles.btnOptionsWrapper}>
        <ActionBtn
          title='No'
          actionFunction={handleNoOption}
          overwriteStyle={{
            backgroundColor: '#FFF',
            border: '1px solid #FFD731',
          }}
        />
        <ActionBtn title='Yes' actionFunction={handleYesOption} />
      </div>
    </div>
  );
}

export default ConfirmationPrompt;
