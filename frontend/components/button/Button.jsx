import React from "react";
import styles from "../button/button.module.css";
import { FaGoogle, FaLock } from "react-icons/fa";

const Button = ({ icon_button, text, enviar }) => {

    //* .: RENDERIZADO CONDICIONAL :. *//

    const google = () => (
        <button className={styles.propiedadesBotonGoogle} onClick={enviar}>
            <FaGoogle className={styles.iconBoton} />
            {text}
        </button>
    )

    const lock = () => (
            <button className={styles.propiedadesBoton} onClick={enviar}>
                <FaLock className={styles.iconBoton} />
                {text}
            </button>
    )

    return icon_button === "Google" ? google() : lock()

}

export default Button