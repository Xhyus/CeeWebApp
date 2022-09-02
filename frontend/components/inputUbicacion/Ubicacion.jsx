import React from 'react'
import styles from '../../styles/crear_asambleas.module.css'

const Ubicacion = (lugar, handleChange) => {
    console.log(lugar.lugar)
    if (lugar.lugar === '') {
        return null
    }
    if (lugar.lugar == 'online') {
        return (
            <div className={styles.contInfo}>
                <section className={styles.select}>
                    <label htmlFor="ubicacion">Plataforma</label>
                    <input className={styles.inputs} type="text" name="ubicacion" onChange={handleChange} placeholder="Ejemplo: Discord, Zoom, Etc." />
                </section>
                <section className={styles.fecha}>
                    <label htmlFor="url">URL</label>
                    <input className={styles.inputs} type="text" name="url" onChange={handleChange} placeholder="www.google.cl" />
                </section>
            </div>
        )
    }
    if (lugar.lugar == 'presencial') {
        return (
            <div className={styles.contenedorInformacion}>
                <label htmlFor="ubicacion">Lugar</label>
                <input className={styles.inputs} type="text" name="ubicacion" onChange={handleChange} placeholder="FACE Sala 103CE" />
            </div>
        )
    }
}

export default Ubicacion