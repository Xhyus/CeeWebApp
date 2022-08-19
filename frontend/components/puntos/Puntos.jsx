import React from 'react'
import styles from '../../styles/crear_asambleas.module.css'

const Puntos = ({ handleChangePunto, id }) => {
    return (
        <div className={styles.contenedorPuntos}>
            <label htmlFor={id}>Punto a tratar: {id + 1}</label>
            <input type="text" name={id} placeholder="Punto a tratar" onChange={handleChangePunto} className={styles.inputs} />
        </div>
    )
}

export default Puntos