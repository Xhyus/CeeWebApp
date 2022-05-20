import React from "react";
import styles from './Input.module.css';

const Input = ({ tipo_input, placeholder_input, handleChangeInput }) => {

    return (
        <input type={tipo_input} placeholder={placeholder_input} handleChangeInput={handleChangeInput} className={styles.propiedades_Input} />
    )

}

export default Input