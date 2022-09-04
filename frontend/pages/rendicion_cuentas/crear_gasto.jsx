import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../../styles/crear_gasto.module.css";
import { ChakraProvider, HStack, Container, Input, Select, FormLabel, FormControl, Button, Heading } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
// import { useEffect } from "react/cjs/react.production.min";

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

        console.log("Edit: " + event.target.value)
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

        //? Validación de campos.
        if (datosGasto.asunto === '' || datosGasto.total === '' || datosGasto.tipo === '' || datosGasto.fecha === '' || datosGasto.detalle === '' || datosGasto.tipo === 'Seleccione un tipo') {
        
            Swal.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            })
        
        } else {

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

        }

        //* Resetear valores de los input.

        //* Enviar al usuario a pantalla "rendicion_cuentas".
    }

    return (

        <ChakraProvider>
            <Container maxW={"container.md"}>
                <HStack align={"center"} justify={"center"} mt={10}>
                    <FaPlusCircle size={30}/>
                    <Heading> Crear Gasto</Heading>
                </HStack>

                <FormControl isRequired mt={5}>
                    <FormLabel>Asunto</FormLabel>
                    <Input type="text" name="asunto" onChange={handleInputChange}/>
                </FormControl>

                <FormControl isRequired mt={5}>
                    <FormLabel>Detalle</FormLabel>
                    <Input type="text" name="detalle" onChange={handleInputChange}/>
                </FormControl>

                <HStack mt={5}>
                    <FormControl isRequired>
                        <FormLabel>Tipo</FormLabel>
                        <Select name="tipo" onChange={handleInputChange}>
                            <option>Seleccione un tipo</option>
                            <option>Actividades</option>
                            <option>Oficina</option>
                            <option>CEE</option>
                            <option>Otros</option>
                        </Select>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Fecha</FormLabel>
                        <Input type="date" name="fecha" onChange={handleInputChange}/>
                    </FormControl>
                </HStack>

                <FormControl isRequired mt={5}>
                    <FormLabel>Total</FormLabel>
                    <Input type="number" name="total" onChange={handleInputChange}/>
                </FormControl>

                <FormControl isRequired mt={5}>
                    <FormLabel>Boleta</FormLabel>
                    <Button colorScheme={"orange"} onClick={()=>console.log("Subir archivo")} w={"full"}>Adjuntar boleta</Button>
                </FormControl>

                <HStack mt={10} mb={10}>
                    <Button colorScheme={"red"} onClick={() => router.push("/rendicion_cuentas")} w={"full"}>Cancelar</Button>
                    <Button colorScheme={"green"} onClick={() => verificarDatos()} w={"full"}>Crear gasto</Button>
                </HStack>
            </Container>
        </ChakraProvider>

    );

}