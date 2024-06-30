import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context"
import CustomButton from "../components/CustomButton"
import { PageHOC } from "../components"
import styles from "../styles"

const JoinBattle = () => {
    const navigate = useNavigate()
  return (
    <>
    <h2 className={styles.joinHeadText}>Available Battles:</h2>
    <p className={styles.infoText} onClick={()=>navigate("/create-battle")}>or Create a new Battle</p>
    </>
  )
}

export default PageHOC(
    JoinBattle,
    <>Join <br /> a Battle</>,
    <>Join an existing battle and start playing</>
)
