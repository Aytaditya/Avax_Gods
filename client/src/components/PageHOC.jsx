import { useNavigate } from 'react-router-dom'
import { logo, heroImg } from '../assets'
import styles from "../styles"

const PageHOC = (Component, title, description) => () => {
    const navigate = useNavigate();
    return (
        <div className={styles.hocContainer}>
            <div className={styles.hocContentBox}>
                <img src={logo} alt="logo" className={styles.hocLogo} onClick={() => navigate("/")} />

                {/* to render content inside section wrapper just like portfolio website */}
                <div className={styles.hocBodyWrapper}>
                    <div className='flex flex-row w-full'>
                        <h1 className={`flex ${styles.headText} head-text`}>{title}</h1>
                        
                    </div>
                    <p className={`${styles.normalText} my-10`}>{description}</p>

                    {/* displaying component here */}
                    <Component />
                </div>

                <p className={styles.footerText}>A Blockchain technology inspired Game 💜</p>


            </div>

            <div className='flex flex-1'>
                <img src={heroImg} alt="home image" className='w-full xl:h-full object-cover' />
            </div>


        </div>
    )
}

export default PageHOC
