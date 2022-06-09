import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/asambleas.module.css'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import { formateoFechaBD } from '../../utils/handleDates'

const verAsamblea = () => {
    const router = useRouter()
    console.log("path: " + router.asPath.split("/")[2])
    const { pid } = router.query
    const [asunto, setAsunto] = useState('')
    const [fecha, setFecha] = useState('')
    const [tipoAsamblea, setTipoAsamblea] = useState('')
    const [acta, setActa] = useState('')
    const [puntos, setPuntos] = useState()


    useEffect(() => {
        let idAsamblea = chequearPID()
        getAsamblea(idAsamblea)

    }, [])

    const chequearPID = () => {
        if (pid) {
            localStorage.setItem('pidAsamblea', pid)
            return pid
        }
        if (!pid && localStorage.getItem('pidAsamblea')) {
            return localStorage.getItem('pidAsamblea')
        }
        if (!pid && !localStorage.getItem('pidAsamblea')) {
            router.push('/404')
        }
    }

    const getAsamblea = (pid) => {
        axios.get(`http://localhost:3001/api/asamblea/${pid}`)
            .then(res => {
                setAsunto(res.data.asunto)
                setTipoAsamblea(res.data.tipoAsamblea)
                setActa(res.data.acta)
                setPuntos(res.data.puntos)
                setFecha(formateoFechaBD(res.data.fecha))
            })
            .catch(err => {
                console.log(err)
            })
    }
    console.log(puntos)
    console.log(acta)
    console.log(fecha)

    return (
        <>
            <Navbar />
            <div className={styles.fondo}>
                <div className={styles.contenedor}>
                    <h1>{asunto}</h1>
                    <p>{fecha.fecha}</p>
                    <p>{fecha.hora}</p>
                    <p>{tipoAsamblea}</p>
                </div>
            </div>
        </>
    )
}

export default verAsamblea