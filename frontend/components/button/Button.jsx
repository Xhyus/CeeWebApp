import React from "react";
import styles from "./Button.module.css";
import { FaGoogle, FaLock } from "react-icons/fa";

const Button = ({ icon_button, text, enviar }) => {

    //* .: RENDERIZADO CONDICIONAL :. *//

    if (icon_button === "Google") {
        return (
            <button className={styles.propiedades_BotonGoogle} onClick={() => enviar}>
                <FaGoogle className={styles.icon_Boton} />
                {text}
            </button>
        )
    }
    if (icon_button === "Lock") {
        return (
            <button className={styles.propiedades_Boton} onClick={() => enviar}>
                <FaLock className={styles.icon_Boton} />
                {text}
            </button>
        )
    }

}

export default Button