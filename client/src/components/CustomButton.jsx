import styles from "../styles"

const CustomButton = ({title,handleClick,restStyles,disabled}) => {
  return (
    <div>
      <button className={`${restStyles} ${styles.btn}`} onClick={handleClick} 
      disabled={disabled}>{title}</button>
    </div>
  )
}

export default CustomButton
