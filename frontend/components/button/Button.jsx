import React from "react";
import styles from "./Button.module.css";
import { FaGoogle, FaLock } from "react-icons/fa";

const Button = ({ icon_button, text, enviar }) => {

    //* .: RENDERIZADO CONDICIONAL :. *//

    const google = () => (
        <button className={styles.propiedades_BotonGoogle} onClick={enviar}>
            <FaGoogle className={styles.icon_Boton} />
            {text}
        </button>
    )

    const lock = () => (
        <button className={styles.propiedades_Boton} onClick={enviar}>
            <FaLock className={styles.icon_Boton} />
            {text}
        </button>
    )

    return icon_button === "Google" ? google() : lock()

}

export default Button