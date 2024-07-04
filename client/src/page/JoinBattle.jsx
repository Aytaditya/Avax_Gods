import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context"
import CustomButton from "../components/CustomButton"
import { PageHOC } from "../components"
import styles from "../styles"
import toast from "react-hot-toast"

const JoinBattle = () => {
    const navigate = useNavigate()

    const {contract,gameData,setShowAlert,setBattleName,
      walletAddress}=useGlobalContext() 


    useEffect(()=>{
        if(gameData?.activeBattle?.battleStatus===1){
          navigate(`/battle/${gameData.activeBattle.name}`)
        }
    },[gameData])


    const handleClick=async(battleName)=>{
      setBattleName(battleName);

      try { 
        await contract.joinBattle(battleName);
        toast.success(`Joined ${battleName} Successfully 🎉`);

        
      } catch (error) {
        console.log(error); 
        toast.error("Failed to join battle 🥹")
      }
    }


  return (
    <>
    <h2 className={styles.joinHeadText}>Available Battles:</h2>

    {/* showing existing battles */}
    <div className={styles.joinContainer}>
      {gameData.pendingBattles.length ? gameData.pendingBattles.filter((battle)=>!battle.players.includes(walletAddress)).map((battle,index)=>(
        <div key={battle.name+index} className={styles.flexBetween}>
          <p className={styles.joinBattleTitle}>{index+1}. {battle.name}</p>
          <CustomButton  title="Join Battle" handleClick={()=>handleClick(battle.name)}/>
        </div>
      )):
        <p className={styles.joinLoading}>No Battles Available: Relod Page</p>}
    </div>

    <p className={styles.infoText} onClick={()=>navigate("/create-battle")}>or Create a new Battle</p>
    </>
  )
}

export default PageHOC(
    JoinBattle,
    <>Join <br /> a Battle</>,
    <>Join an existing battle and start playing</>
)
