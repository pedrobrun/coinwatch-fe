import router from 'next/router';
import React from 'react';
import styles from './BackIcon.module.scss';

function BackIcon() {
  const handleBack = () => {
    router.back();
  };

  return (
    <img
      className={styles.backIcon}
      src="back.png"
      alt=""
      onClick={handleBack}
    ></img>
  );
}

export default BackIcon;
