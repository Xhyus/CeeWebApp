import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/verAsamblea.module.css'
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
    const [contexto, setContexto] = useState('')
    const [puntos, setPuntos] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const getAsamblea = (pid) => {
            axios.get(process.env.SERVIDOR + '/asamblea/' + pid)
                .then(res => {
                    setAsunto(res.data.asunto)
                    setTipoAsamblea(res.data.tipoAsamblea)
                    setActa(res.data.acta)
                    setContexto(res.data.contexto)
                    setFecha(formateoFechaBD(res.data.fecha))
                    let puntos = [...res.data.puntos]
                    puntos.map(punto => {
                        obtenerPunto(punto)
                    })
                })
                .catch(err => {
                    console.log("Error al obtener una asamblea")
                    router.push("/404")
                })
        }
        if (count === 1) {
            getAsamblea(pid)
        } else {
            if (pid !== undefined) {
                getAsamblea(pid)
            }
        }
        setCount(1)
    }, [pid])

    const obtenerPunto = (id) => {
        axios.get(process.env.SERVIDOR + '/punto/' + id)
            .then(res => {
                setPuntos(puntos => [...puntos, res.data])
            })
            .catch(err => {
                console.log("Error al obtener un solo punto")
            })
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
                            <p><span><strong>Tipo de asamblea: </strong></span><span>{tipoAsamblea}</span></p>
                        </div>
                        <div className={styles.contexto}>
                            <h2>Contexto:</h2>
                            <p>{contexto}</p>
                        </div>
                        <div className={styles.puntos}>
                            <h2>Puntos a tratar:</h2>
                            <ul>
                                {puntos.map((punto, key) => {
                                    return (
                                        <div key={key}>
                                            <p>{key + 1}: {punto.asunto}</p>
                                        </div>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <section className={styles.botones}>
                        <div className={styles.datos_fecha}>
                            <span><strong>Fecha: </strong></span>
                            <span>{fecha.fecha}</span>
                            <a href='*' className={`${styles.Propiedades_boton} ${styles.boton_archivos}`}>Ver Archivos</a>
                        </div>
                        <div className={styles.actas}>
                            <a href='/asambleas/actas_asambleas/' className={`${styles.Propiedades_boton} ${styles.boton_actas}`}>Generar Actas</a>
                        </div>
                        <div className={styles.datos_hora}>
                            <span><strong>Hora: </strong></span>
                            <span>{fecha.hora}</span>
                            <a href="/asambleas" className={`${styles.Propiedades_boton} ${styles.boton_atras}`}>Volver</a>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
export default verAsamblea