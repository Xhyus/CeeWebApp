import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/verAsamblea.module.css'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import { formateoFechaBD } from '../../utils/handleDates'
import handleUpperCase from '../../utils/handleUpperCase'
import Puntos from '../../components/puntos_List/Puntos'

const verAsamblea = () => {
    const router = useRouter()
    const { pid } = router.query
    const [asunto, setAsunto] = useState('')
    const [fecha, setFecha] = useState('')
    const [tipoAsamblea, setTipoAsamblea] = useState('')
    const [contexto, setContexto] = useState('')
    const [puntos, setPuntos] = useState([])
    const [count, setCount] = useState(0)
    const [modal, setModal] = useState(false)
    const [archivos, setArchivos] = useState([])

    // modal function
    // const toggle = () => setModal(!modal)

    useEffect(() => {
        const getAsamblea = (pid) => {
            axios.get(process.env.SERVIDOR + '/asamblea/' + pid)
                .then(res => {
                    setAsunto(handleUpperCase(res.data.asunto))
                    setTipoAsamblea(handleUpperCase(res.data.tipoAsamblea))
                    setContexto(handleUpperCase(res.data.contexto))
                    setFecha(formateoFechaBD(res.data.fecha))
                    setArchivos(res.data.archivos)
                    localStorage.setItem('asunto', res.data.asunto)
                    let puntos = [...res.data.puntos]
                    puntos.map(punto => {
                        obtenerPunto(punto)
                    })
                    let archivos = [...res.data.archivos]
                    archivos.map(archivo => {
                        obtenerInformacionArchivo(archivo)
                    })

                })
                .catch(err => {
                    console.log("Error al obtener una asamblea")
                })
        }
        localStorage.setItem('pid', pid);
        if (count === 1) {
            getAsamblea(pid)
        } else {
            if (pid !== undefined) {
                getAsamblea(pid)
            }
        }
        setCount(1)
    }, [pid])

    // const obtenerInformacionArchivo = (id) => {
    //     axios.get(process.env.SERVIDOR + '/archivo/' + id)
    //         .then(res => {
    //             setArchivos(archivo => [...archivo, res.data])
    //         })
    //         .catch(err => {
    //             console.log("Error al obtener un archivo")
    //         })
    // }



    // const downloadFile = (archivo) => {
    //     axios.get("localhost:3001/api/archivo/download/62e7438896eeaa606ce30837", { responseType: 'blob' })
    //         .then(res => {
    //             console.log(res)
    //         }).catch(err => {
    //             console.log("Error al descargar un archivo")
    //         })
    // }

    const obtenerPunto = (id) => {
        axios.get(process.env.SERVIDOR + '/punto/search/' + id)
            .then(res => {
                setPuntos(puntos => [...puntos, res.data])
            })
            .catch(err => {
                console.log("Error al obtener un solo punto")
            })
    }

    const goToActas = (id) => {
        router.push(`/asambleas/actas/${id}`)
    }

    return (
        <>
            <Navbar />
            <div className={styles.fondo}>
                <div className={styles.contenedor}>
                    <div className={styles.datos_titulo}>
                        <h1>{asunto}</h1>
                    </div>
                    <div className={styles.datos_asamblea}>
                        <div className={styles.datos_tipo}>
                            <p ><span className={styles.propiedades_titulo}>Tipo de asamblea: </span><span className={styles.propiedades_texto}>{tipoAsamblea}</span></p>
                        </div>
                        <div className={styles.contexto}>
                            <h2>Contexto:</h2>
                            <p>{contexto}</p>
                        </div>
                        <div className={styles.puntos}>
                            <h2>Puntos a tratar:</h2>
                            <Puntos puntos={puntos} />
                            {/* <h3>Archivos</h3>
                            <ul>
                                {archivos.map(archivo => {
                                    return (
                                        <li key={archivo.id}>
                                            <a onClick={() => downloadFile(archivo)} download>{archivo.nombre}</a>
                                        </li>
                                    )
                                })
                                }

                            </ul> */}
                        </div>
                    </div>
                    <section className={styles.botones}>
                        {/* <div className={styles.datos_fecha}>
                            <span><strong>Fecha: </strong></span>
                            <span>{fecha.fecha}</span>
                            <a onClick={() => { console.log("hola") }} className={`${styles.Propiedades_boton} ${styles.boton_archivos}`}>Ver Archivos</a>
                        </div> */}
                        <div className={styles.actas}>
                            <a onClick={() => goToActas(pid)} className={`${styles.Propiedades_boton} ${styles.boton_actas}`}>Generar Actas</a>
                        </div>
                        <div className={styles.datos_hora}>
                            {/* <span><strong>Hora: </strong></span> */}
                            {/* <span>{fecha.hora}</span> */}
                            <a href="/asambleas" className={`${styles.propiedades_Boton} ${styles.boton_volver} `}>Volver</a>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
export default verAsamblea