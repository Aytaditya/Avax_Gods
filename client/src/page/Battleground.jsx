
import { Toaster } from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import { toast } from "react-hot-toast"

import styles from "../styles"
import { battlegrounds } from "../assets"

import { useGlobalContext } from "../context"



const Battleground = () => {
    const navigate=useNavigate()

    const {setShowAlert,setBattleGround}=useGlobalContext()

    const handleBattleGround=(ground)=>()=>{

        setBattleGround(ground.id)
    
        localStorage.setItem("battleground",ground.id)
    
        toast.success(`Ground  ${ground.name} is Ready for battle `)
    
        setTimeout(()=>{
            navigate(-1) // it will go back to the previous page
        },[2000])
    
    }

  return (
    <div className={`${styles.flexCenter} ${styles.battlegroundContainer}`}>

        <Toaster />

        <h1 className={`${styles.headText} text-center`}>
            Choose your 
            <span className="text-siteViolet ml-2">Battle</span>
            Ground
        </h1>

        <div className={`${styles.flexCenter} ${styles.battleGroundsWrapper}`}>
            {battlegrounds.map((ground)=>(
                <div className={`${styles.flexCenter} ${styles.battleGroundCard}`} key={ground.id} onClick={handleBattleGround(ground)}>

                    <img src={ground.image} alt="Ground" className={styles.battleGroundCardImg} />

                    <div className="info absolute">
                        <p className={styles.battleGroundCardText}>{ground.name}</p>
                    </div>

                </div>
            ))}
        </div>
      
    </div>
  )
}

export default Battleground
