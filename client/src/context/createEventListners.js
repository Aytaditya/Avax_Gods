import { ethers } from "ethers";

import { ABI } from "../contract";

import {toast} from 'react-hot-toast';

const addNewEvent=(eventFilter,provider,cb)=>{
    provider.removeListener(eventFilter); 

    provider.on(eventFilter,(logs)=>{
        const parsedLog=(new ethers.utils.Interface(ABI)).parseLog(logs);

        cb(parsedLog);
    })
}

export const createEventListeners = ({navigate,contract,provider,walletAddress,setShowAlert}) => {
    const NewPlayerEventFilter=contract.filters.NewPlayer();
    addNewEvent(NewPlayerEventFilter,provider,({args})=>{
        console.log("New Player Created",args)

        if(walletAddress===args.owner){
            setShowAlert({status:true,type:"success",message:`Player Registered Successfully 🎉`})
        }
    })
}