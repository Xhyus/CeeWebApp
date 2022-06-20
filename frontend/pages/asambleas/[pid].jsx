import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/asambleas.module.css'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import { formateoFechaBD } from '../../utils/handleDates'

const verAsamblea = () => {
    const router = useRouter()
    const { pid } = router.query
    const [asunto, setAsunto] = useState('')
    const [fecha, setFecha] = useState('')
    const [tipoAsamblea, setTipoAsamblea] = useState('')
    const [acta, setActa] = useState('')
    const [puntos, setPuntos] = useState([])

    console.log(router.route)
    useEffect(() => {
        if (pid) {
            getAsamblea(pid)
        }
        if (!pid) {
            getAsamblea(router.asPath.split("/")[2])
        }
    }, [])

    const getAsamblea = (pid) => {
        axios.get(process.env.SERVIDOR + '/asamblea/' + pid)
            .then(res => {
                setAsunto(res.data.asunto)
                setTipoAsamblea(res.data.tipoAsamblea)
                setActa(res.data.acta)
                setFecha(formateoFechaBD(res.data.fecha))
                let puntos = [...res.data.puntos]
                puntos.map(punto => {
                    obtenerPunto(punto)
                })
            })
            .catch(err => {
                console.log("Error al obtener una asamblea")
                // router.push("/404")
            })
    }

    const obtenerPunto = (id) => {
        axios.get(process.env.SERVIDOR + '/punto/' + id)
            .then(res => {
                setPuntos(puntos => [...puntos, res.data])
            })
            .catch(err => {
                console.log("Error al obtener un solo punto")
            })
    }

    console.log(puntos)
    // console.log(acta)
    // console.log(fecha)

    return (
        <>
            <Navbar />
            <div className={styles.fondo}>
                <div className={styles.contenedorAsamblea}>
                    <div className={styles.subContenedor}>
                        <h1 className={styles.titulo_filtro}>{asunto}</h1>
                        <div className={styles.contenedorInformacion}>
                            <p className={styles.tipoAsamblea}>Tipo de asamblea: {tipoAsamblea}</p>
                            <h3 className={styles.titulo_filtro}>Puntos a tratar:</h3>
                            <div>
                                {puntos.map((punto, key) => {
                                    return (
                                        <div key={key}>
                                            <p>{key + 1}: {punto.asunto}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <p>Fecha: {fecha.fecha}</p>
                            <p>Hora: {fecha.hora}</p>
                            <div className={styles.botones}>
                                <button className={styles.Propiedades_boton}>Crear Acta</button>
                                <button className={styles.Propiedades_boton}>Crear puntos</button>
                                <button className={styles.Propiedades_boton} onClick={() => router.push("/asambleas")}>Atras</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default verAsamblea