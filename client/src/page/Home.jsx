import { useState } from 'react';
import { PageHOC } from '../components';

import {useGlobalContext} from "../context";

import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'

const Home = () => {

  const {contract,walletAddress,setShowAlert}=useGlobalContext();

  const [playerName,setPlayerName]=useState("");

  const handleClick=async()=>{
      try {
        console.log(playerName,walletAddress)
        console.log("contract",contract)
        if(playerName===''){
          throw new Error("Name is required")
        }
        if(!walletAddress){
          throw new Error("Please connect your wallet")
        }

        const playerExists=await contract.isPlayer(walletAddress);

        if(!playerExists){
          await contract.registerPlayer(playerName,playerName);

          setShowAlert({status:true,type:"info",message:`${playerName} is being called!!!`})
        }
        
      } catch (error) {
        alert(error.message)
      }
  }

  return (
    <div className='flex flex-col '>

      <CustomInput Label="Name" placeholder="Enter Your Name" value={playerName} handleValueChange={setPlayerName}/>

      <CustomButton title="Register" handleClick={handleClick} restStyles="mt-6"/>



    </div>
  )
};

export default PageHOC(
  Home,
  <>Welcome to Avax Gods <br /> a Web3 NFT Card Game</>,
  <>Connect your wallet to start playing <br />the ultimate Web3 Battle card game</>

);