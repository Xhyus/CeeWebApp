import React, { useState } from 'react'
import styles from './Filtro.module.css'
import axios from 'axios'

const Filtro = ({ tipo }) => {
    const ISSERVER = typeof window === "undefined";
    let carrera
    if (!ISSERVER) {
        carrera = localStorage.getItem('carrera')
    }
    const [filtro, setFiltro] = useState(false)
    const [informacion, setInformacion] = useState([])
    const [data, setData] = useState({
        estado: '',
        tipo: '',
        inicio: '',
        fin: ''
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }



    const filtrar = () => {
        setFiltro(true)
        axios.get(`${process.env.SERVIDOR}/asambleas/filtros/${carrera}?estado=${data.estado}&tipo=${data.tipo}&inicio=${data.inicio}&fin=${data.fin}`, data)
            .then(res => {
                setInformacion(res.data)
            }).catch(err => {
                console.log(err)
            }
            )
    }

    return (
        < >
            <div className={styles.filtro}>
                <label className={styles.label}>Estado Asamblea: </label>
                <select onChange={handleChange} name="estado" className={styles.filtro_contenido_estado}>
                    <option value="">Estado</option>
                    <option value="terminadas">Terminadas</option>
                    <option value="noTerminadas">Por realizar</option>
                </select>
            </div>
            <div className={styles.filtro}>
                <label className={styles.label}>Tipo de Asamblea: </label>
                <select onChange={handleChange} name="tipoAsamblea">
                    <option value="">Tipo de Asamblea</option>
                    <option value="resolutiva">Resolutiva</option>
                    <option value="informativa">Informativa</option>
                </select>
            </div>
            <div className={styles.filtro}>
                <label className={styles.label}>Desde </label>
                <label className={styles.label}>Hasta </label>
                <input onChange={handleChange} type="date" name="inicio" className={styles.filtro_contenido_fecha} />
                <input onChange={handleChange} type="date" name="fin" className={styles.filtro_contenido_fecha} />
            </div>
            <div className={styles.filtro}>
                <button onClick={() => filtrar()}>Filtrar Asambleas</button>
            </div>
        </>
    )

}

export default Filtro