import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomButton from './CustomButton'
import {useGlobalContext} from '../context'
import { AlertIcon,alertIcon,gameRules } from '../assets'
import {Toaster,toast} from 'react-hot-toast'

import styles from '../styles'

const GameInfo = () => {
  const {contract,gameData,showAlert,setShowAlert} = useGlobalContext()

  const [toggleSideBar,setToggleSideBar] = useState(false)
  const navigate = useNavigate()

  const handleBattleExit=async()=>{
      const battleName=gameData.activeBattle.name;

      try {
          await contract.quitBattle(battleName,{
            gasLimit:200000
          });
          toast.success(`Successfully exited ${battleName}!!`)

      } catch (error) {
        console.log(error.message)
        toast.error('Failed to exit battle')
      }
  }

  useEffect(()=>{

  },[])
  return (
    <>
    <div className={styles.gameInfoIconBox}>
      <Toaster/>
      <div className={`${styles.gameInfoIcon} ${styles.flexCenter}`} onClick={()=>setToggleSideBar(true)}>
        <img src={alertIcon} alt="Info" className={styles.gameInfoIconImg} />

      </div>
    </div>

    <div className={`${styles.gameInfoSidebar} ${toggleSideBar ? 'transalte-x-0':'translate-x-full'} ${styles.glassEffect} ${styles.flexBetween} backdrop-blur-3xl `}>

      <div className='flex flex-col'>
        <div className={styles.gameInfoSidebarCloseBox}>
          <div className={`${styles.flexCenter} ${styles.gameInfoSidebarClose}`} onClick={()=>setToggleSideBar(false)}>
            X
          </div>

        </div>

        <h3 className={styles.gameInfoHeading}>Game Rules :</h3>

        <div className='mt-3'>
          {gameRules.map((rule,index)=>(
             <p key={index} className={styles.gameInfoText}>
              <span className={`font-bold mr-3`}>
                {index+1}.
              </span>
              {rule}
             </p>
          ))}
        </div>
      </div>

          <div className={`${styles.flexBetween} mt-6 gap-4 w-full`}>
            <CustomButton title="Change battleground" handleClick={()=>navigate('/battleground')}/>
            <CustomButton title="Exit Battle" handleClick={handleBattleExit}/>
          </div>
    </div>
      
    </>
  )
}

export default GameInfo
