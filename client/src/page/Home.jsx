import { useState } from 'react';
import { PageHOC } from '../components';

import {useGlobalContext} from "../context";

import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import {toast} from 'react-hot-toast';

const Home = () => {

  const {contract,walletAddress,setShowAlert}=useGlobalContext();

  const [playerName,setPlayerName]=useState("");

  const [loading,setLoading]=useState(false);



  const handleClick=async()=>{
      try {
        console.log(playerName,walletAddress)
        console.log("contract",contract)
        if(playerName===''){
          throw new Error("Please Enter your Name 🧌")
        }
        if(!walletAddress){
          throw new Error("Please connect your wallet 🧛")
        }

        setLoading(true);
        setPlayerName("")

        const playerExists=await contract.isPlayer(walletAddress);

        if(playerExists){
          throw new Error(`Player already registered 🧛`)
        }


        if(!playerExists){
          await contract.registerPlayer(playerName,playerName);

          setShowAlert({status:true,type:"info",message:`${playerName} is being called!!!`})

          
          setLoading(false);
          toast.success(`${playerName} is being called 😈`)
        }
      
        
      } catch (error) {
        toast.error(error.message)
      }finally{
        setLoading(false);
      }
     
  }

  return (
    <div className='flex flex-col '>

      <CustomInput Label="Name" placeholder="Enter Your Name" value={playerName} handleValueChange={setPlayerName}/>

     
        {!loading && <CustomButton title="Register" handleClick={handleClick} restStyles="mt-6" disabled={false}/>}

        {loading && <CustomButton title="Registering..." restStyles="mt-6" disabled={true}/>}


      



    </div>
  )
};

export default PageHOC(
  Home,
  <>Welcome to Avax-Gods <br /> a Web3 NFT Card Game</>,
  <>Connect your wallet to start playing <br />the ultimate Web3 Battle card game</>

);