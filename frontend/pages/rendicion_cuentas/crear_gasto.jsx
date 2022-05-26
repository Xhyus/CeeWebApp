import axios from "axios";
import React, { useState } from "react";
import styles from "../../styles/rendicion_cuentas.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useEffect } from "react/cjs/react.production.min";

export default function crear_gasto() {

    const router = useRouter()

    useEffect(() => {
        isLogged()
    }, [])


    const isLogged = () => {
        if (localStorage.getItem('token') === null) {
            router.push('/')
        }
    }

    //* .: DATOS DEL GASTO :. *//
    const [datosGasto, setDatosGasto] = useState({
        asunto: '',
        total: '',
        tipo: '',
        fecha: '',
        detalle: '',
    })

    //! Instrucción temporal
    const [boletaGasto, setBoletaGasto] = useState("/carpeta/foto/boleta")

    //* Enviar datos a la API.
    const datosVerificados = {
        asunto: datosGasto.asunto,
        fecha: datosGasto.fecha,
        totalGastado: datosGasto.total,
        detalle: datosGasto.detalle,
        boleta: boletaGasto,
        tipoGasto: datosGasto.tipo,
    }

    //? Función para capturar cambios en los inputs.
    const handleInputChange = (event) => {

        setDatosGasto({

            ...datosGasto,
            [event.target.name]: event.target.value

        })

    }

    //? Función para verificar los datos en caso de que hayan campos incorrectos.
    const verificarDatos = () => {
        enviarDatos();
    }

    //? Función para crear gasto enviando los datos verificados.
    const enviarDatos = () => {

        //? Bandera de información guardada.
        console.log("--------------------------------------");
        console.log("Asunto        : " + datosGasto.asunto);
        console.log("Total Gastado : " + datosGasto.total);
        console.log("Tipo Gasto    : " + datosGasto.tipo);
        console.log("Fecha Gasto   : " + datosGasto.fecha);
        console.log("Detalle       : " + datosGasto.detalle);
        console.log("Boleta        : " + boletaGasto + "\n");
        console.log("--------------------------------------");

        //? Crear gasto.
        // axios.post(process.env.SERVIDOR +'/rendicion/', datosVerificados)
        // .then((respuesta) => {
        //     console.log("Solicitud creación Gasto: " + respuesta);
        // })
        // .catch((error) => {
        //     console.log("Error al crear el gasto: " + error);
        // })

        //* Mostrar alerta en pantalla.
        Swal.fire({
            title: 'Gasto creado',
            text: datosVerificados.asunto,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })

        //* Resetear valores de los input.

        //* Enviar al usuario a pantalla "rendicion_cuentas".
    }

    return (

        //* .: CONTENEDOR PRINCIPAL :. *//
        <div className={styles.Contenedor_principal}>

            {/* .: CONTENEDOR DEL FORMULARIO :. */}
            <div className={styles.Contenedor_secundario}>

                {/* .: TITULO :. */}
                <div className={styles.Contenedor_titulo}>
                    <h1 className={styles.Propiedades_texto}>Agregar gasto</h1>
                </div>

                <div className={styles.Contenedor_contenido}>

                    {/* .: ASUNTO y TOTAL :. */}
                    <div className={styles.Contenedor_asunto_total}>

                        {/* Ingresar asunto del gasto */}
                        <div>
                            <p className={styles.Propiedades_texto}>Asunto</p>
                            <input type="text" name="asunto" onChange={handleInputChange} />
                        </div>

                        {/* Ingresar total del gasto */}
                        <div>
                            <p className={styles.Propiedades_texto}>Total</p>
                            <input type="number" name="total" onChange={handleInputChange} />
                        </div>

                    </div>

                    {/* .: TIPO y FECHA :. */}
                    <div className={styles.Contenedor_tipo_fecha}>

                        {/* Ingresar tipo de gasto (Ingreso o gasto) */}
                        <div>
                            <p className={styles.Propiedades_texto}>Tipo</p>
                            <input type="text" name="tipo" onChange={handleInputChange} />
                        </div>

                        {/* Ingresar fecha en que se realizó el gasto */}
                        <div>
                            <p className={styles.Propiedades_texto}>Fecha</p>
                            <input type="date" name="fecha" onChange={handleInputChange} />
                        </div>

                    </div>

                    {/* .: DETALLE :. */}
                    <div className={styles.Contenedor_detalle}>
                        <h3 className={styles.Propiedades_texto}>Detalle</h3>
                        <input type="text" name="detalle" onChange={handleInputChange} />
                    </div>

                    {/* .: BOLETA :. */}
                    <div className={styles.Contenedor_boleta}>
                        <h3 className={styles.Propiedades_texto}>Boleta</h3>
                        <input type="file" name="boleta" onChange={handleInputChange} />
                    </div>

                    {/* .: ENVIAR :. */}
                    <div className={styles.Contenedor_boton}>
                        <button className={styles.Propiedades_texto} onClick={() => verificarDatos()}>Enviar</button>
                    </div>

                </div>

            </div>

        </div>

    );

}