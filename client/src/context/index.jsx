import { createContext, useContext, useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useNavigate } from "react-router-dom";
import { ABI, ADDRESS } from "../contract/index";
import { createEventListeners } from "../context/createEventListners";
import { GetParams } from "../utils/onboard";
import toast from "react-hot-toast";

const GlobalContext = createContext();
const { ethereum } = window;

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');

    // battleground image
  const [battleGround, setBattleGround] = useState('bg-astral');

  // smart contract and provider state
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);


  const [step, setStep] = useState(1);

  // game data state to store all the pending and existing battles
  const [gameData, setGameData] = useState({ players: [], pendingBattles: [], activeBattle: null });

  // alert state to show alerts
  const [showAlert, setShowAlert] = useState({ status: false, type: 'info', message: '' });

  // battlename
  const [battleName, setBattleName] = useState('');

  // error message state
  const [errorMessage, setErrorMessage] = useState('');

  // for updating Game data for oponnent joins the game
  const [updateGameData, setUpdateGameData] = useState(0);

  const player1Ref = useRef();
  const player2Ref = useRef();

  const navigate = useNavigate();

  // Function to store data in local storage with expiry
  const storeWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  // Function to retrieve data from local storage with expiry check
  const retrieveWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    try {
      const item = JSON.parse(itemStr);
      const now = new Date();
      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  };

  useEffect(()=>{
        const isBattleground=localStorage.getItem("battleground");
        if(isBattleground){
            setBattleGround(isBattleground);
        }else{
          localStorage.setItem("battleground",battleGround);
        }
  },[])


  // reset web3 on boarding modal
  useEffect(()=>{

    const resetParams=async()=>{
      const currentStep=await GetParams();
      setStep(currentStep);
    }
    resetParams();
    window?.ethereum?.on('chainChanged', ()=>resetParams());
    window?.ethereum?.on('accountsChanged', ()=>resetParams());
  },[])


  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        storeWithExpiry('walletAddress', accounts[0], 24 * 60 * 60 * 1000); // 1 day expiry
      } else {
        setWalletAddress('');
        localStorage.removeItem('walletAddress');
      }
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const updateCurrentWalletAddress = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length > 0) {
      setWalletAddress(accounts[0]);
      storeWithExpiry('walletAddress', accounts[0], 24 * 60 * 60 * 1000); // 1 day expiry
    }
  };

  useEffect(() => {
    const storedWalletAddress = retrieveWithExpiry('walletAddress');
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
    } else {
      updateCurrentWalletAddress();
    }
  }, []);

  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const newContract = new ethers.Contract(ADDRESS, ABI, signer);
      setProvider(provider);
      setContract(newContract);
    };

    setSmartContractAndProvider();
  }, []);



  //* Activate event listeners for the smart contract
//   useEffect(() => {
//     if (step === -1 && contract) {
//       createEventListeners({
//         navigate,
//         contract,
//         provider,
//         walletAddress,
//         setShowAlert,
//         player1Ref,
//         player2Ref,
//         setUpdateGameData,
//       });
//     }
//   }, [step]);


//* Activate event listeners for the smart contract
useEffect(()=>{
    if(contract ){
        createEventListeners({
            navigate,
            contract,
            provider,
            walletAddress,
            setShowAlert,
            setUpdateGameData,
            player1Ref,
            player2Ref,
           
        })
    }
},[contract,step])

  //* Set the game data to the state
//   useEffect(() => {
//     const fetchGameData = async () => {
//       if (contract) {
//         const fetchedBattles = await contract.getAllBattles();
//         const pendingBattles = fetchedBattles.filter((battle) => battle.battleStatus === 0);
//         let activeBattle = null;

//         fetchedBattles.forEach((battle) => {
//           if (battle.players.find((player) => player.toLowerCase() === walletAddress.toLowerCase())) {
//             if (battle.winner.startsWith('0x00')) {
//               activeBattle = battle;
//             }
//           }
//         });

//         setGameData({ pendingBattles: pendingBattles.slice(1), activeBattle });
//       }
//     };

//     fetchGameData();
//   }, [contract, updateGameData]);


//* Set the game data to the state
useEffect(()=>{

  const fetchGameData=async()=>{

    const fetchBattles=await contract.getAllBattles();
    console.log(fetchBattles);

    const pendingBattles=fetchBattles.filter((battle)=>battle.battleStatus===0); //0 means pending battle

    let activeBattle=null;

    fetchBattles.forEach((battle)=>{
      if(battle.players.find((player)=>player.toLowerCase()===walletAddress.toLowerCase())){
        if(battle.winner.startsWith('0x00')){ //0x00 means no winner and hence battle is still active
          activeBattle=battle;

        }
      }
    })

    setGameData({pendingBattles:pendingBattles.slice(1),activeBattle});
    
  }

  if(contract){
    fetchGameData();
  }

},[contract,updateGameData])

  //* Handling alerts
  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: 'info', message: '' });
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

 //  Handle error messages
  useEffect(() => {
    if (errorMessage) {
      const parsedErrorMessage = errorMessage?.reason?.slice('execution reverted: '.length).slice(0, -1);

      if (parsedErrorMessage) {
        setShowAlert({
          status: true,
          type: 'failure',
          message: parsedErrorMessage,
        });
      }
      setErrorMessage("Move Already Made wait for Oponnent to make move")
      toast.error(parsedErrorMessage);
    }
  }, [errorMessage]);

  return (
    <GlobalContext.Provider
      value={{
       
        contract,
        walletAddress,
        
        showAlert,
        setShowAlert,
        
        errorMessage,
        setErrorMessage,
        // connectWallet
        battleName,
        setBattleName,
        gameData,
        battleGround,
        setBattleGround,
        player1Ref,
        player2Ref,
        updateCurrentWalletAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);