import React from 'react';
import { useNavigate } from 'react-router-dom';


import { useGlobalContext } from '../context';
import { logo, heroImg } from '../assets';
import styles from '../styles';

import { Toaster,ToastBar } from 'react-hot-toast';

const PageHOC = (Component, title, description) => () => {
  const { showAlert } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <div className={styles.hocContainer}>

      <Toaster>
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease',
            }}
          />
        )}
      </Toaster>

      <div className={styles.hocContentBox}>
        <img src={logo} alt="logo" className={styles.hocLogo} onClick={() => navigate('/')} />

        <div className={styles.hocBodyWrapper}>
          <div className="flex flex-row w-full">
            <h1 className={`flex ${styles.headText} head-text`}>{title}</h1>
          </div>

          <p className={`${styles.normalText} my-10`}>{description}</p>

          <Component />



        </div>
        <div className='flex justify-end items-end mt-[-100px]'>
          <p className={`${styles.footerText}`}>A Blockchain powered Game 💜</p>
        </div>
      </div>

      <div className="flex flex-1">
        <img src={heroImg} alt="hero-img" className="w-full xl:h-full object-cover" />
      </div>
    </div>
  );
};

export default PageHOC;