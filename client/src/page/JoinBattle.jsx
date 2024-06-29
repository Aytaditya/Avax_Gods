import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context"
import CustomButton from "../components/CustomButton"
import { PageHOC } from "../components"
import styles from "../styles"

const JoinBattle = () => {
  return (
    <div>
        
      
    </div>
  )
}

export default PageHOC(
    JoinBattle,
    <>Join <br /> a Battle</>,
    <>Join an existing battle and start playing</>
)
