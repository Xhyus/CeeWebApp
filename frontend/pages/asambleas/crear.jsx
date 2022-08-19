import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { isLogged } from '../../utils/logged'
import styles from '../../styles/crear_asambleas.module.css'

const crear = () => {
    const [asamblea, setAsamblea] = useState({
        asunto: '',
        fecha: '',
        tipoAsamblea: '',
        puntos: []
    })
    const [puntos, setPuntos] = useState([{
        asunto: '',
        id: ''
    }])
    const [cantidadPuntos, setCantidadPuntos] = useState(1)

    useEffect(() => {
        isLogged()
    }, [])

    const handleChange = (e) => {
        setAsamblea({
            ...asamblea,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        setAsamblea({
            ...asamblea,
            puntos: puntos
        })
        console.log("asunto: ", asamblea.asunto, "fecha: ", asamblea.fecha, "tipoAsamblea: ", asamblea.tipoAsamblea, "puntos: ", puntos)
    }

    const handleChangePunto = (e) => {
        setPuntos({
            id: e.target.id,
            asunto: e.target.value
        })
        console.log("punto: ", puntos.asunto, "id: ", puntos.id)
    }

    const puntosList = () => {
        let puntos = []
        for (let i = 0; i < cantidadPuntos; i++) {
            puntos.push(
                <div className={styles.contenedorPuntos}>
                    <input type="text" id={i} placeholder="Asunto a tratar" onChange={handleChangePunto} className={styles.inputs} />
                </div>
            )
        }
        return puntos
    }

    return (
        <>
            <Navbar />
            <div className={styles.fondo}>
                <div className={styles.contenedor}>
                    <div className={styles.contenedorCrear}>
                        <p className={styles.titulo_filtro}><strong>Crear Asamblea</strong></p>
                        <section className={styles.contenedores}>
                            <div className={styles.contenedorAsunto}>
                                <label className={styles.labels}>Asunto: </label>
                                <input className={styles.inputs} name="asunto" id='asunto' type="text" placeholder="Asunto" onChange={handleChange} />
                            </div>
                            <div className={styles.contenedorTipoAsamblea}>
                                <label className={styles.labels}>Tipo de asamblea: </label>
                                <select className={styles.selectTipo} name="selectTipo" id='selectTipo' onChange={handleChange}>
                                    <option value="">Seleccione un tipo de asamblea</option>
                                    <option value="resolutiva">Resolutiva</option>
                                    <option value="informativa">Informativa</option>
                                </select>
                            </div>
                            <div className={styles.contenedorFecha}>
                                <label className={styles.labels}>Fecha: </label>
                                <input className={styles.inputs} type="datetime-local" onChange={handleChange} name="fecha" id="input-fecha" />
                            </div>
                            <button onClick={() => setCantidadPuntos(cantidadPuntos + 1)} > Puntos </button >
                            {puntosList()}
                            <button className={`${styles.Propiedades_boton} ${styles.crear}`} onClick={() => handleSubmit()}>Crear Asamblea</button>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default crear