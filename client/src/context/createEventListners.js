import { ethers } from "ethers";

import { ABI } from "../contract";

import { useNavigate } from "react-router-dom";

import {toast} from 'react-hot-toast';

import { playAudio, sparcle } from '../utils/animation.js';
import { defenseSound } from '../assets';



const addNewEvent=(eventFilter,provider,cb)=>{
    provider.removeListener(eventFilter); 

    provider.on(eventFilter,(logs)=>{
        const parsedLog=(new ethers.utils.Interface(ABI)).parseLog(logs);

        cb(parsedLog);
    })
    
}

const emptyAccount = '0x0000000000000000000000000000000000000000';

const getCoords=(cardRef)=>{
    const {left,top,width,height}=cardRef.current.getBoundingClientRect(); //getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
    return{
        pageX:left+width/2,
        pageY:top+height/2.25  // this is for the animations to be in the center of the card
    }
}

export const createEventListeners = ({navigate,contract,provider,walletAddress,setShowAlert,setUpdateGameData,player1Ref,player2Ref}) => {
    const NewPlayerEventFilter=contract.filters.NewPlayer();
    addNewEvent(NewPlayerEventFilter,provider,({args})=>{
        console.log("New Player Created",args)

        if(walletAddress===args.owner){
            setShowAlert({status:true,type:"success",message:`Player Registered Successfully 🎉`})
        }
    })

    const newGameTokenEventFilter=contract.filters.NewGameToken();
    addNewEvent(newGameTokenEventFilter,provider,({args})=>{
        console.log("New Game Token Created",args,walletAddress);

        if(walletAddress.toLowerCase()===args.owner.toLowerCase()){
            setShowAlert({status:true,type:"success",message:`Game Token Created Successfully 🎉`})
            toast.success("Player Game token has been Created Successfully 🎉")
        }

        navigate('/create-battle')
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

    const RoundEndedEventFilter=contract.filters.RoundEnded();
    addNewEvent(RoundEndedEventFilter,provider,({args})=>{
        console.log("Round Ended",args,walletAddress);


        for(let i=0;i<args.damagedPlayers.length;i++){
            if(args.damagedPlayers[i]!=emptyAccount ){
                if(args.damagedPlayers[i]===walletAddress){
                   sparcle(getCoords(player1Ref))
                }
                else if(args.damagedPlayers[i]!=walletAddress){
                    sparcle(getCoords(player2Ref))
                }
            }
            else{
                playAudio(defenseSound)
            }
        }

        setUpdateGameData((prevUpdateGameData)=>prevUpdateGameData+1);
    })

    const BattleEndedEventFilter=contract.filters.BattleEnded();
    addNewEvent(BattleEndedEventFilter,provider,({args})=>{
        console.log("Battle Ended",args,walletAddress);

        if(args.winner.toLowerCase()===walletAddress.toLowerCase()){
            toast.success("You Won the Battle 🎉")
        }
        else{
            toast.error("You Lost the Battle 😢")
        }

        navigate('/create-battle')
    })
  
}