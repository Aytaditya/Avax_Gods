import { useNavigate } from "react-router-dom"
import CustomButton from "./CustomButton"
import { useGlobalContext } from "../context"
import { player01,player02 } from "../assets"
import styles from "../styles"

const GameLoad = () => {
    const {walletAddress}=useGlobalContext();
    const navigate=useNavigate();
    
  return (
    <div className={`${styles.flexBetween} ${styles.gameLoadContainer}`}>
        <div className={styles.gameLoadBtnBox}>
            <CustomButton 
            title="Choose your BattleGround"
            handleClick={()=>navigate("/battleground")} 
            restStyles="mt-6"
            />
        </div>

        <div className={`flex-1 ${styles.flexCenter} flex-col`}>
            <h1 className={`${styles.headText} text-center`}>Waiting for a
                <br /> Worthy Opponent...
            </h1>
            <p className={styles.gameLoadText}>Pro Tip: While you are waiting choose your preffered battleground</p>

            <div className={styles.gameLoadPlayersBox}>

                <div className={`${styles.flexCenter} flex-col`}>
                    <img src={player01} alt="Player 1" className={styles.gameLoadPlayerImg} />
                    <p className={styles.gameLoadPlayerText}>{walletAddress.slice(0,8)}....{walletAddress.slice(30)}</p>
                </div>

                <h2 className={styles.gameLoadVS}>Vs</h2>

                <div className={`${styles.flexCenter} flex-col`}>
                    <img src={player02} alt="Player 1" className={styles.gameLoadPlayerImg} />
                    <p className={styles.gameLoadPlayerText}>????????</p>
                </div>

            </div>
        </div>
      
    </div>
  )
}

export default GameLoad
