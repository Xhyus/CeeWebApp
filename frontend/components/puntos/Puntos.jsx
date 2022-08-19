import React from 'react'
import styles from '../../styles/crear_asambleas.module.css'
import { FaTrash } from 'react-icons/fa'

const Puntos = ({ handleChangePunto, id, handleDeletePunto }) => {

    const handleDelete = () => {
        if (id !== 0) {
            return (
                <FaTrash className={styles.icono} onClick={() => handleDeletePunto(id)} />
            )
        }
    }

    return (
        <div className={styles.contenedorPuntos}>
            <label htmlFor={id}>Punto a tratar: {id + 1}</label>
            <div className={styles.contenedorPunto}>

                <input type="text" name={id} placeholder="Punto a tratar" onChange={handleChangePunto} className={styles.inputs} />
                {handleDelete()}
            </div>
        </div>
    )
}

export default Puntos