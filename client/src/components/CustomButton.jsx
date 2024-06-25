import styles from "../styles"

const CustomButton = ({title,handleClick,restStyles}) => {
  return (
    <div>
      <button className={`${restStyles} ${styles.btn}`} onClick={handleClick}>{title}</button>
    </div>
  )
}

export default CustomButton
