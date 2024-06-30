import Tilt from "react-parallax-tilt"
import styles from "../styles"
import {allCards} from "../assets"

const generateRandomCard=()=>{
  return allCards[Math.floor(Math.random()*(allCards.length-1))]
}

const img1=generateRandomCard()
const img2=generateRandomCard()

const Card = ({card,title,restStyles,cardRef,playerTwo}) => {
 
  return (
    <Tilt>

      <div className={`relative   z-0 transition-all ${restStyles}`}>
      <img src={playerTwo ? img2 : img1} alt="Card Image" className={styles.cardImg}/>

      <div className={`${styles.cardPointContainer} sm:left-[14%] sm:bottom-[25%] left-[22%] ${styles.flexCenter}`}>
        <p className={`${styles.cardPoint} text-yellow-400 `}>{card}</p>
      </div>

      <div className={`${styles.cardPointContainer} sm:left-[63%] sm:bottom-[25%] left-[22%] ${styles.flexCenter}`}>
        <p className={`${styles.cardPoint} text-red-700 `}>{card}</p>
      </div>

      <div className={`${styles.cardTextContainer} ${styles.flexCenter}`}>
        <p className={styles.cardText1}>{title}</p>
      </div>
      
      

    </div>

    
    </Tilt>
    
  )
}

export default Card
