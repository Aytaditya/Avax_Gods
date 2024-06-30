import { useNavigate } from "react-router-dom"
import CustomButton from "./CustomButton"
import { useGlobalContext } from "../context"
import { player01,player02 } from "../assets"
import styles from "../styles"

const GameLoad = () => {
    const {walletAddress}=useGlobalContext();
    
  return (
    <div>
      {walletAddress}
    </div>
  )
}

export default GameLoad
