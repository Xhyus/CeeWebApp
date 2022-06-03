import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { isLogged } from '../../utils/logged'

const crear = () => {
    const [asunto, setAsunto] = useState()
    const [fecha, setFecha] = useState()
    const [tipoAsamblea, setTipoAsamblea] = useState(null)
    const [boton, setboton] = useState('Crear')

    useEffect(() => {
        isLogged()
    }, [])

    const handleChangeAsunto = (e) => {
        setAsunto(e.target.value)
    }

    const handleChangeFecha = (e) => {
        setFecha(e.target.value)
    }

    const handleChangeTipoAsamblea = (e) => {
        setTipoAsamblea(e.target.value)
        console.log(tipoAsamblea)
    }

    return (
        <>
            <Navbar />
            <div>
                <h1>Agendar Asamblea</h1>
                <select onChange={handleChangeTipoAsamblea}>
                    <option value="null">Seleccione un tipo de asamblea</option>
                    <option value="resolutiva">Resolutiva</option>
                    <option value="informativa">Informativa</option>
                </select>
                <input type="text" placeholder="Asunto" onChange={handleChangeAsunto} />
                <input type="datetime-local" onChange={handleChangeFecha} name="input-fecha" id="input-fecha" />
                <button onClick={() => {
                    setboton('Creando...')
                    console.log("los datos son: ", asunto, fecha, tipoAsamblea)
                    setTimeout(() => {
                        setboton('Crear')
                    }, 2000)
                }}>{boton}</button>

            </div>
        </>
    )
}

export default crear