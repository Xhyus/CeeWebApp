import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { isLogged } from '../../utils/logged'
import styles from '../../styles/asambleas.module.css'

const crear = () => {
    const [asunto, setAsunto] = useState()
    const [fecha, setFecha] = useState()
    const [tipoAsamblea, setTipoAsamblea] = useState(null)
    const [boton, setboton] = useState('Crear')

    useEffect(() => {
        isLogged()
    }, [])

    const handleChangeAsunto = (e) => {
        setAsunto(e.target.value)
    }

    const handleChangeFecha = (e) => {
        setFecha(e.target.value)
    }

    const handleChangeTipoAsamblea = (e) => {
        setTipoAsamblea(e.target.value)
        console.log(tipoAsamblea)
    }

    const handleSubmit = () => {
        console.log(asunto, fecha, tipoAsamblea)
    }

    return (
        <>
            <Navbar />
            <div className={styles.fondo}>
                <div className={styles.contenedor}>
                    <div className={styles.contenedorCrear}>
                        <p className={styles.titulo_filtro}><strong>Filtro</strong></p>
                        <section className={styles.contenedores}>
                            <div className={styles.contenedorAsunto}>
                                <label className={styles.labels}>Asunto: </label>
                                <input className={styles.inputs} name="Asunto" id='Asunto' type="text" placeholder="Asunto" onChange={handleChangeAsunto} />
                            </div>
                            <div className={styles.contenedorTipoAsamblea}>
                                <label className={styles.labels}>Tipo de asamblea: </label>
                                <select className={styles.selectTipo} name="selectTipo" id='selectTipo' onChange={handleChangeTipoAsamblea}>
                                    <option value="null">Seleccione un tipo de asamblea</option>
                                    <option value="resolutiva">Resolutiva</option>
                                    <option value="informativa">Informativa</option>
                                </select>
                            </div>
                            <div className={styles.contenedorFecha}>
                                <label className={styles.labels}>Fecha: </label>
                                <input className={styles.inputs} type="datetime-local" onChange={handleChangeFecha} name="input-fecha" id="input-fecha" />
                            </div>
                            <button className={styles.Propiedades_boton} onClick={() => handleSubmit()}>{boton}</button>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default crear