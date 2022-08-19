import React from 'react'
import styles from '../../styles/crear_asambleas.module.css'
import { FaTrash } from 'react-icons/fa'

const Puntos = ({ handleChangePunto, id, handleDeletePunto }) => {

    const handleDelete = () => {
        if (id !== 0) {
            return (
                <div className={styles.contenedorBoton}>
                    <FaTrash className={styles.icono} onClick={() => handleDeletePunto(id)} />
                </div>
            )
        }
    }

    return (
        <div className={styles.contenedorPuntos}>
            <div className={styles.contenedorPunto}>

                <label htmlFor={id}>Punto a tratar: {id + 1}</label>
                <input type="text" name={id} placeholder="Punto a tratar" onChange={handleChangePunto} className={styles.inputs} />
            </div>
            {handleDelete()}
        </div>
    )
}

export default Puntos