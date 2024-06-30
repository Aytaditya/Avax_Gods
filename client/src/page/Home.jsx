import { useEffect, useState } from 'react';
import { PageHOC } from '../components';
import { useGlobalContext } from "../context";
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { contract, walletAddress, setShowAlert } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleClick = async () => {
    try {
      console.log(playerName, walletAddress);
      console.log("contract", contract);

      if (playerName === '') {
        throw new Error("Please Enter your Name 🧌");
      }
      if (!walletAddress) {
        throw new Error("Please connect your wallet 🧛");
      }

      setLoading(true);

      const playerExists = await contract.isPlayer(walletAddress);
      if (playerExists) {
        throw new Error(`Wallet already registered 🧛`);
      }

      await contract.registerPlayer(playerName, playerName);
      setShowAlert({ status: true, type: "info", message: `${playerName} is being called!!!` });
      toast.success(`${playerName} is being called!!!😈`);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const checkForPlayerToken = async () => {
      try {
        if (contract) {
          const playerExists = await contract.isPlayer(walletAddress);
          const playerTokenExists = await contract.isPlayerToken(walletAddress);

          console.log("playerExists", playerExists);
          console.log("playerTokenExists", playerTokenExists);

          if (playerExists && playerTokenExists) {
            navigate("/create-battle");
          }
        }
      } catch (error) {
        console.error('Error checking for player token:', error);
      }
    }

    checkForPlayerToken();
  }, [contract, walletAddress, navigate]);

  return (
    <div className='flex flex-col '>
      <CustomInput Label="Name" placeholder="Enter Your Name" value={playerName} handleValueChange={setPlayerName} />
      {!loading && (
        <CustomButton title="Register" handleClick={handleClick} restStyles="mt-6" disabled={false} />
      )}
      {loading && (
        <CustomButton title="Registering..." restStyles="mt-6" disabled={true} />
      )}
      {/* {(!item) && (<CustomButton title="Connect your Wallet" handleClick={connectWallet} restStyles="mt-10"/>)} */}
    </div>
  );
};

export default PageHOC(
  Home,
  <>Welcome to Avax-Gods <br /> a Web3 NFT Card Game</>,
  <>Connect your wallet to start playing <br />the ultimate Web3 Battle card game</>
);