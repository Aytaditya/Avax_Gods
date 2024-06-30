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

  const {contract,battleName,setBattleName,gameData}=useGlobalContext();

  const [waitBattle,setWaitBattle]=useState(false);

  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    if(gameData?.activeBattle?.battleStatus===0){
      setWaitBattle(true);
    }
  },[gameData]);

  const handleClick=async()=>{
    if(!battleName || !battleName.trim()){
      // return toast.error("Enter Battle Name 🧌",{style:{backgroundColor:'#FFCCCB',border:'1px solid red'}});
      return toast.error("Enter Battle Name 🧌");
    }

    try {

      await contract.createBattle(battleName);

      setWaitBattle(true);
      toast.success("Battle Created Successfully 🎉");
      
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

      {!loading && (
        <CustomButton title="Create Battle" handleClick={handleClick} restStyles="mt-3"/>
      )}

      {loading && (
        <CustomButton title="Creating Battle..." restStyles="mt-3" disabled={true}/>
      )}

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