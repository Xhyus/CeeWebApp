import React from "react";
import styles from "../button/Button.module.css";
import { FaGoogle, FaLock } from "react-icons/fa";

const Button = ({ icon_button, text, enviar, keyButton }) => {

    //* .: RENDERIZADO CONDICIONAL :. *//

    const google = () => (
        <button className={styles.propiedadesBotonGoogle} onKeyDown={keyButton} onClick={enviar}>
            <FaGoogle className={styles.iconBoton} />
            {text}
        </button>
    )

    const lock = () => (
        <button className={`${styles.propiedadesBoton}`} onKeyDown={keyButton} onClick={enviar}>
            <FaLock className={`${styles.iconBoton} ${styles.propiedadesText}`} />
            {text}
        </button>
    )

    return icon_button === "Google" ? google() : lock()

}

export default Button