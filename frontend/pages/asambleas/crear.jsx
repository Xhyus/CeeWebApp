import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { isLogged } from '../../utils/logged'
import styles from '../../styles/crear_asambleas.module.css'
import Puntos from '../../components/puntos/Puntos'
import { FaPlus, FaTrash } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'

const crear = () => {
    const [asamblea, setAsamblea] = useState({
        asunto: '',
        fecha: '',
        tipoAsamblea: '',
        contexto: '',
    })
    const [puntos, setPuntos] = useState([{
        id: 0,
        asunto: ''
    }])

    useEffect(() => isLogged(), [])

    const handleChange = (e) => {
        setAsamblea({
            ...asamblea,
            [e.target.name]: e.target.value
        })
    }

    const handleAddPunto = () => {
        const ultimoId = puntos[puntos.length - 1].id
        setPuntos([...puntos, {
            id: ultimoId + 1,
            asunto: ''
        }])
    }
    const handleDeletePunto = (id) => {
        setPuntos(puntos.filter(punto => punto.id !== id))
        puntos.map(punto => {
            if (punto.id > id) {
                punto.id = punto.id - 1
            }
        })
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

    const handleSubmit = () => {
        if (asamblea.asunto === '' || asamblea.fecha === '' || asamblea.tipoAsamblea === '' || asamblea.contexto === '') {
            Swal.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        } else {
            let carrera = localStorage.getItem('carrera')
            axios.post(process.env.SERVIDOR + '/asamblea/' + carrera, {
                asunto: asamblea.asunto,
                fecha: asamblea.fecha,
                tipoAsamblea: asamblea.tipoAsamblea,
                contexto: asamblea.contexto,
            })
                .then(res => {
                    postPunto(res.data._id)
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al crear la asamblea',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                })
        }

    }

    const postPunto = (id) => {
        puntos.map(punto => {
            let data = {
                asunto: punto.asunto,
                descripcion: ""
            }
            axios.post(process.env.SERVIDOR + '/punto/' + id, data)
                .then(res => {
                    Swal.fire({
                        title: 'Exito',
                        text: 'Asamblea creada con exito',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                }).catch(err => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al crear los puntos',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                })
        })
    }

    return (
        <>
            <Navbar />
            <div className={styles.fondo}>
                <div className={styles.contenedor}>
                    <div className={styles.contenedorCrear}>
                        <h1 className={styles.titulo_filtro}>Crear Asamblea</h1>
                        <section className={styles.contenedores}>
                            <div className={styles.contenedorAsunto}>
                                <label className={styles.labels}>Asunto: </label>
                                <input className={styles.inputs} name="asunto" required id='asunto' type="text" placeholder="Asunto asamblea" onChange={handleChange} />
                            </div>
                            <div className={styles.contenedorContexto}>
                                <label className={styles.labels}>Contexto Asamblea: </label>
                                <textarea className={styles.textarea} name="contexto" required id='contexto' type="text" placeholder="Contexto asamblea" onChange={handleChange} />
                            </div>
                            <div className={styles.contenedorTipoAsamblea}>
                                <label className={styles.labels}>Tipo de asamblea: </label>
                                <select className={styles.selectTipo} required name="tipoAsamblea" id='tipoAsamblea' onChange={handleChange}>
                                    <option value="">Seleccione un tipo de asamblea</option>
                                    <option value="resolutiva">Resolutiva</option>
                                    <option value="informativa">Informativa</option>
                                </select>
                            </div>
                            <div className={styles.contenedorFecha}>
                                <label className={styles.labels}>Fecha: </label>
                                <input className={styles.inputs} required type="datetime-local" onChange={handleChange} name="fecha" id="input-fecha" />
                            </div>
                            {puntos.map((punto, index) => {
                                return (
                                    <Puntos key={index} handleChangePunto={handleChangePunto} id={punto.id} handleDeletePunto={handleDeletePunto} />
                                )
                            })
                            }
                            <FaPlus className={styles.icon} onClick={() => handleAddPunto()} />
                            <button className={`${styles.Propiedades_boton} ${styles.crear}`} onClick={() => handleSubmit()}>Crear Asamblea</button>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default crear