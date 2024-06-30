import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styles from "../styles"
import { toast, Toaster } from 'react-hot-toast';

import { useGlobalContext } from "../context"
import { attack, attackSound, defense, defenseSound, player01 as player01Icon, player02 as player02Icon } from "../assets"

import { playAudio } from "../utils/animation.js"

import ActionButton from '../components/ActionButton'
import PlayerInfo from "../components/PlayerInfo"
import Card from "../components/Card"
import GameInfo from "../components/GameInfo"

const Battle = () => {
  const { contract, gameData, walletAddress, showAlert, setShowAlert, battleGround } = useGlobalContext();

  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});

  const { battleName } = useParams();

  const navigate = useNavigate();

  useEffect(() => {

    const getPlayerInfo = async () => {
      try {
        let player01Address = null;
        let player02Address = null;

        //setting wallet address equal to 1 or 2 based on the wallet address
        if (gameData.activeBattle.players[0].toLowerCase() === walletAddress.toLowerCase()) {
          player01Address = walletAddress;
          player02Address = gameData.activeBattle.players[1];
        }
        else {
          player01Address = gameData.activeBattle.players[0];
          player02Address = walletAddress;
        }

        const p1Token = await contract.getPlayerToken(player01Address);

        const player01 = await contract.getPlayer(player01Address);
        const player02 = await contract.getPlayer(player02Address);

        const p1Att = p1Token.attackStrength.toNumber();
        const p1Def = p1Token.defenseStrength.toNumber();

        const p1H = player01.playerHealth.toNumber();
        const p1M = player01.playerMana.toNumber();

        const p2H = player02.playerHealth.toNumber();
        const p2M = player02.playerMana.toNumber();

        setPlayer1({ ...player01, attack: p1Att, def: p1Def, health: p1H, mana: p1M });
        setPlayer2({ ...player02, attack: 'X', def: 'X', health: p2H, mana: p2M });

      } catch (error) {
        console.log(error.message)
        toast.error("Some Error Occured 🥹")

      }
    }

    if (contract && gameData.activeBattle) {
      getPlayerInfo();
    }

  }, [contract, gameData, battleName])

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className={`${styles.flexBetween} ${styles.gameContainer} ${battleGround}`}>


        <PlayerInfo player={player2} playerIcon={player02Icon} mt />

        <div className={`${styles.flexCenter} flex-col my-10`}>
          <Card
            card={player2}
            title={player2?.playerName}
            cardRef=''
            playerTwo />


          <div className={`flex items-center flex-row`}>
            <ActionButton imgUrl={attack} handleClick={() => { }} restStyles="mr-2 hover:border-yellow-400" />

            <Card
              card={player1}
              title={player1?.playerName}
              cardRef=''
              restStyles="mt-3"
            />

            <ActionButton imgUrl={defense} handleClick={() => { }} restStyles="ml-6 hover:border-red-600" />

          </div>


        </div>

        <PlayerInfo player={player1} playerIcon={player01Icon} mt/>

        <GameInfo/>

      </div>
    </>
  )
}

export default Battle
