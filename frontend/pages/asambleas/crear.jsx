import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { isLogged } from '../../utils/logged'
import styles from '../../styles/crear_asambleas.module.css'
import Puntos from '../../components/puntos/Puntos'
import { FaPlus, FaTrash, FaPlusCircle } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
// import Ubicacion from '../../components/inputUbicacion/Ubicacion'

const crear = () => {
    const [asamblea, setAsamblea] = useState({
        asunto: '',
        fecha: '',
        tipoAsamblea: '',
        contexto: '',
        ubicacion: '',
        url: '',
    })
    const [puntos, setPuntos] = useState([{
        id: 0,
        asunto: ''
    }])
    const [lugar, setLugar] = useState('')
    const router = useRouter()

    useEffect(() => isLogged(), [])

    const handleChange = (e) => {
        setAsamblea({
            ...asamblea,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeLugar = (e) => {
        setLugar(e.target.value)
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
                ubicacion: asamblea.ubicacion,
                url: asamblea.url,
            })
                .then(res => {
                    postPunto(res.data._id)
                })
                .catch(err => {
                    console.log("Error de crear asamblea: " + err)
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
                    console.log("punto creado con exito")
                }).catch(err => {
                    console.log("Error de crear punto: " + err)
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al crear los puntos',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                })
        }).then(() => {
            enviarCorreo()
        }).catch(err => {
            console.log("Error de crear punto: " + err)
            Swal.fire({
                title: 'Error',
                text: 'Error al crear los puntos',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        })
    }

    const enviarCorreo = () => {
        let carrera = localStorage.getItem('carrera')
        axios.post(`${process.env.SERVIDOR}/asamblea/mail/${carrera}`, {
            asunto: asamblea.asunto,
            fecha: asamblea.fecha,
            tipoAsamblea: asamblea.tipoAsamblea,
            contexto: asamblea.contexto,
            ubicacion: asamblea.ubicacion,
            url: asamblea.url,
            puntos: puntos
        })
            .then(res => {
                Swal.fire({
                    title: 'Exito',
                    text: 'Asamblea Creada con exito y notificada por correo',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                })
            }).catch(err => {
                console.log("Error de enviar correo: " + err)
                Swal.fire({
                    title: 'Error',
                    text: 'Error al enviar el correo',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            })
    }

    const wawa = () => {
        if (lugar === '') {
            return null
        }
        if (lugar == 'online') {
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
        if (lugar == 'presencial') {
            return (
                <div className={styles.contenedorInformacion}>
                    <label htmlFor="ubicacion">Lugar</label>
                    <input className={styles.inputs} type="text" name="ubicacion" onChange={handleChange} placeholder="FACE Sala 103CE" />
                </div>
            )
        }
    }

    return (
        <>
            <Navbar />
            <div className={styles.fondo}>
                <div className={styles.contenedor}>
                    <div className={styles.contenedorCrear}>
                        <div className={styles.contenedorTitulo}>
                            <FaPlusCircle className={styles.iconTitulo} />
                            <h1 className={styles.titulo}>Crear Asamblea</h1>
                        </div>
                        <section className={styles.contenedores}>
                            <div className={styles.contenedorInformacion}>
                                <label className={styles.labels}>Asunto: </label>
                                <input className={styles.inputs} name="asunto" required id='asunto' type="text" placeholder="Asunto asamblea" onChange={handleChange} />
                            </div>
                            <div className={styles.contenedorInformacion}>
                                <label className={styles.labels}>Contexto Asamblea: </label>
                                <textarea className={styles.textarea} name="contexto" required id='contexto' type="text" placeholder="Contexto asamblea" onChange={handleChange} />
                            </div>
                            <div className={styles.contInfo}>
                                <section className={styles.select}>
                                    <label className={styles.labels}>Tipo de asamblea: </label>
                                    <select className={styles.selectTipo} required name="tipoAsamblea" id='tipoAsamblea' onChange={handleChange}>
                                        <option value="">Seleccione un tipo de asamblea</option>
                                        <option value="resolutiva">Resolutiva</option>
                                        <option value="informativa">Informativa</option>
                                    </select>
                                </section>
                                <section className={styles.fecha}>
                                    <label className={styles.labels}>Fecha: </label>
                                    <input className={styles.inputFecha} required type="datetime-local" onChange={handleChange} name="fecha" id="input-fecha" />
                                </section>
                            </div>
                            <div className={styles.contenedorInformacion}>
                                <section className={styles.select}>
                                    <label className={styles.labels}>Formato asamblea: </label>
                                    <select className={styles.selectTipo} required name="lugar" id='lugar' onChange={handleChangeLugar}>
                                        <option value="">Seleccione una opción</option>
                                        <option value="presencial">Presencial</option>
                                        <option value="online">Online</option>
                                    </select>
                                    {/* <Ubicacion lugar={lugar} handleChange={handleChange} /> */}
                                    {wawa()}
                                </section>
                            </div>
                            {puntos.map((punto, index) => {
                                return (
                                    <Puntos key={index} handleChangePunto={handleChangePunto} id={punto.id} handleDeletePunto={handleDeletePunto} />
                                )
                            })
                            }
                            <div className={styles.add}>
                                <FaPlus className={styles.icon} onClick={() => handleAddPunto()} />
                                <a onClick={handleAddPunto}>Agregar punto</a>
                            </div>
                            <div className={styles.botones}>
                                <button className={`${styles.boton} ${styles.crear}`} onClick={() => handleSubmit()}>Crear Asamblea</button>
                                <button className={`${styles.boton} ${styles.cancelar}`} onClick={() => router.push("/asambleas")}>Cancelar</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default crear