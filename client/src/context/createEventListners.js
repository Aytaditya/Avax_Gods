import { ethers } from "ethers";

import { ABI } from "../contract";

import { useNavigate } from "react-router-dom";

import {toast} from 'react-hot-toast';



const addNewEvent=(eventFilter,provider,cb)=>{
    provider.removeListener(eventFilter); 

    provider.on(eventFilter,(logs)=>{
        const parsedLog=(new ethers.utils.Interface(ABI)).parseLog(logs);

        cb(parsedLog);
    })
}

export const createEventListeners = ({navigate,contract,provider,walletAddress,setShowAlert,setUpdateGameData}) => {
    const NewPlayerEventFilter=contract.filters.NewPlayer();
    addNewEvent(NewPlayerEventFilter,provider,({args})=>{
        console.log("New Player Created",args)

        if(walletAddress===args.owner){
            setShowAlert({status:true,type:"success",message:`Player Registered Successfully 🎉`})
        }
    })

    const NewBattleEventFilter=contract.filters.NewBattle();
    addNewEvent(NewBattleEventFilter,provider,({args})=>{
        console.log("New Battle Created",args,walletAddress);

        

        if(walletAddress.toLowerCase()===args.player1.toLowerCase() || walletAddress.toLowerCase()===args.player2.toLowerCase()){
            setShowAlert({status:true,type:"success",message:`Battle Created Successfully 🎉`})
            navigate(`/battle/${args.battleName}`)
        }

       setUpdateGameData((prevUpdateGameData)=>prevUpdateGameData+1);

    })

    const BattleMoveEventFilter = contract.filters.BattleMove();
    addNewEvent(BattleMoveEventFilter, provider, ({ args }) => {
      console.log('Battle move initiated!', args);
    });
  
}