import React from 'react';
import { PageHOC } from '../components';
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles';
import { useGlobalContext } from '../context';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {toast} from 'react-hot-toast';

import GameLoad from '../components/GameLoad';

const CreateBattle = () => {
  const navigate=useNavigate();

  const {contract,battleName,setBattleName}=useGlobalContext();

  const [waitBattle,setWaitBattle]=useState(true);

  const handleClick=async()=>{
    if(!battleName || !battleName.trim()){
      // return toast.error("Enter Battle Name 🧌",{style:{backgroundColor:'#FFCCCB',border:'1px solid red'}});
      return toast.error("Enter Battle Name 🧌");
    }

    try {

      await contract.methods.createBattle(battleName);

      setWaitBattle(true);
      
    } catch (error) {
      console.log(error.message);
      return toast.error("Error Occured 😭");
    }
  }

  return (
    <>
    {waitBattle && <GameLoad/>}
    <div className='flex flex-col mb-5'>

      <CustomInput Label="Start Battle" placeholder="Enter Battle Name" value={battleName} handleValueChange={setBattleName}/>

      <CustomButton title="Create Battle" handleClick={handleClick} restStyles="mt-3"/>

    </div>

    <p className={styles.infoText} onClick={()=>navigate("/join-battle")}>or Join Already Existing Battles</p>
     
    </>
  )
};

export default PageHOC(
  CreateBattle,
  <>Create <br /> a new Battle</>,
  <>Create your own battles and wait for opponent to join the battle</>

);