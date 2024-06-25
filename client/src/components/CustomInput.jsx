import styles from "../styles"

const regex=/^[A-Za-z0-9]+$/;

const CustomInput = ({Label,placeholder,value,handleValueChange}) => {
  return (
    <>
      <label htmlFor="Name" className={styles.label}>{Label}</label>
      <input type="text" placeholder={placeholder} value={value} onChange={(e)=>{
        if(e.target.value==='' || regex.test(e.target.value)){
          handleValueChange(e.target.value)
        }
      }} className={styles.input} />
    </>
  )
}

export default CustomInput
