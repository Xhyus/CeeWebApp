import React from 'react'
import styles from './Filtro.module.css'

const Filtro = ({ tipo }) => {
    if (tipo === 'fecha') {
        return (
            <div className={styles.opciones_filtro_fecha}>
                <p className={styles.texto} >Desde: </p>
                <input type="date" className={styles.calendario} name="filtro4" onClick={() => { console.log("filtro4"); }}></input>
            </div>
        )
    } else {
        return (
            <div className={styles.opciones_filtro}>
                <input type="checkbox" className={styles.checkbox} name="filtro1" onClick={() => { console.log("filtro1"); }}></input>
                <p className={styles.texto} >Filtro</p>
            </div>
        )
    }
}

export default Filtro