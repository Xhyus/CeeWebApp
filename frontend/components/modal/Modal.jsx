import React from 'react'
import styles from './Modal.module.css'

const Modal = () => {
    return (
        // Aqui va la parte para que el modal se muestre.
        <div className={styles.container_Modal}>
            <input type="checkbox" id="boton_modal" className={styles.boton_modal}></input>
            <label for="boton_modal" className={styles.modal_label}>Abrir modal</label>
            
            <div className={styles.modal}>
                <header className={styles.header}></header>
                <label className={styles.label_botonModal} for="boton_modal">X</label>
                <div className={styles.contenido_modal}>
                     {/* acá va el texto que debe tener el modal */}
                     <p>contenido</p>
                </div>
            </div>

        </div>

    )
}

export default Modal