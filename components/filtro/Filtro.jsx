import React, { useState } from 'react'
import styles from './Filtro.module.css'

const Filtro = ({ tipo, getRendiciones }) => {

    //? Hook que nos ayudará a saber si el filtro está activo o no.
    const [filtroActivo, setFiltroActivo] = useState(false);

    //? Label que nos ayudará a identificar el tipo de filtro.
    const label = {
        rendicionesMenor10K: "Menor a 10.000",
        rendicionesMenor3K: "Menor a 3.000",
        rendicionesOficina: "Oficina",
        rendicionesActividad: "Actividades",
    }

    const choise = () => {
        if (tipo === 'fecha') {
            return (
                <div className={styles.opciones_filtro_fecha}>
                    <p className={styles.texto} >Desde: </p>
                    <input type="date" className={styles.calendario} name="filtro4" onClick={() => { console.log("filtro4"); }}></input>
                </div>
            )
        } else {
            return (
                <div className={styles.opciones_filtro}>
                    <input type="checkbox" className={styles.checkbox} name="filtro1" onClick={() => {
                        setFiltroActivo(!filtroActivo);

                        if (filtroActivo === false) {
                            getRendiciones(tipo);
                        } else {
                            getRendiciones("rendiciones");
                        }
                    }}></input>
                    <p className={styles.texto} >{label[tipo]}</p>
                </div>
            )
        }
    }

    return choise()

}

export default Filtro