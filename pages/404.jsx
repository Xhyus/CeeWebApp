import React from 'react'
import styles from "../styles/page404.module.css";


export default function page404() {
    return (
        <div className={styles.fondo}>
            <div>
            </div>
            <div className={styles.contenedorError}>
                <div className={styles.contenedorIzquierda}>
                    <h1 className={styles.textoError}>Error</h1>
                    <h1 className={styles.texto404}>404</h1>
                </div>
                <div className={styles.contenedorCentral}>
                    <img src="/separadorVertical.svg" alt="" className={styles.separadorVertical} />
                    <img src="/separadorHorizontal.svg" alt="" className={styles.separadorHorizontal} />
                </div>
                <div className={styles.contenedorDerecha}>
                    <h1 className={styles.textoPagina}>Página no</h1>
                    <h1 className={styles.textoPagina}>encontrada</h1>
                    <img src="/sad.svg" alt="" className={styles.sad} />
                </div>
            </div>
        </div>
    )
}
