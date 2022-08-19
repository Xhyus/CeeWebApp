import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { isLogged } from '../../utils/logged'
import styles from '../../styles/crear_asambleas.module.css'
import Puntos from '../../components/puntos/Puntos'
import { FaPlus } from 'react-icons/fa'

const crear = () => {
    const [asamblea, setAsamblea] = useState({
        asunto: '',
        fecha: '',
        tipoAsamblea: '',
        puntos: []
    })
    const [puntos, setPuntos] = useState([{
        id: 0,
        asunto: ''
    }])

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
        puntos.map(punto => {
            asamblea.puntos.push(punto.asunto)
        })
        setAsamblea({
            ...asamblea,
            puntos: puntos
        })
        console.log("asunto: ", asamblea.asunto, "fecha: ", asamblea.fecha, "tipoAsamblea: ", asamblea.tipoAsamblea, "puntos: ", asamblea.puntos)
    }

    const handleChangePunto = (e) => {
        setPuntos(
            puntos.map(punto => {
                if (punto.id.toString() === e.target.name) {
                    return {
                        ...punto,
                        asunto: e.target.value
                    }
                }
                return punto
            })
        )
    }

    const handleAddPunto = () => {
        const ultimoId = puntos[puntos.length - 1].id
        setPuntos([...puntos, {
            id: ultimoId + 1,
            asunto: ''
        }])
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
                            <FaPlus onClick={() => handleAddPunto()} />
                            {puntos.map((punto, index) => {
                                return (
                                    <Puntos key={index} handleChangePunto={handleChangePunto} id={punto.id} />
                                )
                            })
                            }
                            <button className={`${styles.Propiedades_boton} ${styles.crear}`} onClick={() => handleSubmit()}>Crear Asamblea</button>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default crear