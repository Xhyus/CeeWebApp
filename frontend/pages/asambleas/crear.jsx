import React, { useState, useEffect } from 'react'
import { isLogged } from '../../utils/logged'
import Puntos from '../../components/puntos/Puntos'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { Container, Heading, ChakraProvider, FormControl, FormLabel, Input, Button, Select, Link, Textarea, HStack, Center, Spinner } from '@chakra-ui/react'

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
    const [isLoading, setIsLoading] = useState(false)

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
            setIsLoading(true)
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
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al crear la asamblea',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                })
        }
    }


    const postPunto = async (id) => {
        await puntos.map(punto => {
            let data = {
                asunto: punto.asunto,
                descripcion: ""
            }
            axios.post(process.env.SERVIDOR + '/punto/' + id, data)
                .then(res => {
                }).catch(err => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al crear los puntos',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                })
        })
        enviarCorreo()
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
                setIsLoading(false)
                Swal.fire({
                    title: 'Exito',
                    text: 'Asamblea Creada con exito y notificada por correo',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',

                }).then(() => {
                    router.push('/asambleas')
                })
            }).catch(err => {
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
                <HStack mb={5}>
                    <FormControl isRequired>
                        <FormLabel>Ubicacion</FormLabel>
                        <Input type="text" name="ubicacion" onChange={handleChange} placeholder="Ejemplo: Discord, Zoom, Etc." />
                    </FormControl>
                    <FormControl isRequired >
                        <FormLabel>Url</FormLabel>
                        <Input type="text" name="url" onChange={handleChange} placeholder="www.google.cl" />
                    </FormControl>
                </HStack>
            )
        }
        if (lugar == 'presencial') {
            return (
                <FormControl isRequired mb={5}>
                    <FormLabel>Ubicacion</FormLabel>
                    <Input type="text" name="ubicacion" onChange={handleChange} placeholder="Ejemplo: FACE Sala 103CE" />
                </FormControl>
            )
        }
    }

    if (isLoading) {
        return (
            <ChakraProvider>
                <Center h="92.5vh">
                    <Spinner size="xl" />
                </Center>
            </ChakraProvider>
        )
    }

    return (
        <>
            <ChakraProvider>
                <Container maxW={"container.md"}>
                    <HStack align={"center"} justify={"center"} mt={10}>
                        <FaPlusCircle size={30} />
                        <Heading>Crear Asamblea</Heading>
                    </HStack>
                    <FormControl isRequired mt={4}>
                        <FormLabel>Asunto</FormLabel>
                        <Input name="asunto" required id='asunto' type="text" placeholder="Asunto asamblea" onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired mt={4}>
                        <FormLabel>Contexto</FormLabel>
                        <Textarea name="contexto" required id='contexto' type="text" placeholder="Contexto asamblea" onChange={handleChange} resize={"none"} minH={200} />
                    </FormControl>
                    <HStack mt={4}>
                        <FormControl isRequired >
                            <FormLabel>Tipo asamblea</FormLabel>
                            <Select required name="tipoAsamblea" id='tipoAsamblea' onChange={handleChange}>
                                <option value="">Seleccione un tipo de asamblea</option>
                                <option value="resolutiva">Resolutiva</option>
                                <option value="informativa">Informativa</option>
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Fecha</FormLabel>
                            <Input required name="fecha" id='fecha' type="datetime-local" onChange={handleChange} />
                        </FormControl>
                    </HStack>
                    <FormControl isRequired mt={4}>
                        <FormLabel>Lugar</FormLabel>
                        <Select required name="lugar" id='lugar' onChange={handleChangeLugar}>
                            <option value="">Seleccione un lugar</option>
                            <option value="online">Online</option>
                            <option value="presencial">Presencial</option>
                        </Select>
                    </FormControl>
                    <FormControl isRequired mt={4}>
                        {wawa()}
                    </FormControl>
                    {puntos.map((punto, index) => {
                        return (
                            <Puntos key={index} handleChangePunto={handleChangePunto} id={punto.id} ultimo={puntos.length} handleDeletePunto={handleDeletePunto} />
                        )
                    })
                    }
                    <FormControl>
                        <HStack mt={4} align={"center"} justify={"center"}>
                            <FaPlus size={20} onClick={handleAddPunto} />
                            <Link mt={4} colorScheme="blue" onClick={handleAddPunto}>Agregar Punto</Link>
                        </HStack>
                    </FormControl>
                    <HStack mt={4} mb={10}>
                        <Button colorScheme="red" onClick={() => router.push("/asambleas")} w={"full"} > Cancelar </Button>
                        <Button colorScheme="green" onClick={() => handleSubmit()} w={"full"} > Crear Asamblea </Button>
                    </HStack>
                </Container>
            </ChakraProvider>
        </>
    )

}

export default crear