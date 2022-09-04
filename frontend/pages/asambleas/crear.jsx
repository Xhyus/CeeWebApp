import React, { useState, useEffect } from 'react'
import { isLogged } from '../../utils/logged'
import Puntos from '../../components/puntos/Puntos'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { Container, Heading, ChakraProvider, FormControl, FormLabel, Input, Button, Select, Link, Textarea, HStack, Center, Spinner, Collapse, Tooltip } from '@chakra-ui/react'
import validacion from '../../utils/validacion'

const crear = () => {
    const [asamblea, setAsamblea] = useState({
        asunto: '',
        fecha: '',
        tipoAsamblea: '',
        contexto: '',
        ubicacion: '',
        url: null,
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
        if (e.target.name === 'fecha') {
            if (e.target.value < new Date().toISOString().split('T')[0]) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La fecha no puede ser menor a la actual',
                }).then(() => {
                    document.getElementById("fecha").value = "";
                })
            } else {
                setAsamblea({
                    ...asamblea,
                    [e.target.name]: e.target.value
                })
            }
        } else {
            setAsamblea({
                ...asamblea,
                [e.target.name]: e.target.value
            })
        }
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

    const validateWithRegex = (regex, value) => {
        return regex.test(value)
    }

    const formatDate = (date) => {
        const d = new Date(date)
        const month = '' + (d.getMonth() + 1)
        const day = '' + d.getDate()
        const year = d.getFullYear()
        return [year, month, day].join('-')
    }

    const handleChangePunto = (e) => {
        setPuntos(
            puntos.map(punto => {
                if (punto.id.toString() === e.target.name) {
                    if (e.target.value != "[a - zA - Z]") {

                        return {
                            ...punto,
                            asunto: e.target.value
                        }
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
            const data = {
                asunto: asamblea.asunto,
                fecha: asamblea.fecha,
                tipoAsamblea: asamblea.tipoAsamblea,
                contexto: asamblea.contexto,
                ubicacion: asamblea.ubicacion,
                url: asamblea.url,
            }
            let carrera = localStorage.getItem('carrera')
            axios.post(process.env.SERVIDOR + '/asamblea/' + carrera, data)
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
                        <Tooltip label="Plataforma a utilizar" color={"white"} aria-label="Plataforma a utilizar">
                            <Input type="text" name="ubicacion" onChange={handleChange} placeholder="Ejemplo: Discord, Zoom, Etc." />
                        </Tooltip>
                    </FormControl>
                    <FormControl isRequired >
                        <FormLabel>Url</FormLabel>
                        <Tooltip label="URL de la plataforma para entrar a la asamblea" color={"white"} aria-label="URL de la plataforma para entrar a la asamblea">
                            <Input type="url" name="url" onChange={handleChange} placeholder="www.google.cl" isInvalid={validacion()} />
                        </Tooltip>
                    </FormControl>
                </HStack>
            )
        }
        if (lugar == 'presencial') {
            return (
                <FormControl isRequired mb={5}>
                    <FormLabel>Ubicacion</FormLabel>
                    <Tooltip label="Lugar donde se realizara la asamblea" color={"white"} aria-label="Lugar donde se realizara la asamblea">
                        <Input type="text" name="ubicacion" onChange={handleChange} placeholder="Ejemplo: FACE Sala 103CE" />
                    </Tooltip>
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
                        <Tooltip label="Nombre o tema destacado de la asamblea" color={"white"} aria-label="Nombre o tema destacado de la asamblea">
                            <Input name="asunto" required id='asunto' type="text" placeholder="Asunto asamblea" onChange={handleChange} />
                        </Tooltip>
                    </FormControl>
                    <FormControl isRequired mt={4}>
                        <FormLabel>Contexto</FormLabel>
                        <Tooltip label="Contexto de la asamblea" color={"white"} aria-label="Contexto de la asamblea">
                            <Textarea name="contexto" required id='contexto' type="text" placeholder="Contexto asamblea" onChange={handleChange} resize={"none"} minH={200} />
                        </Tooltip>
                    </FormControl>
                    <HStack mt={4}>
                        <FormControl isRequired >
                            <FormLabel>Tipo asamblea</FormLabel>
                            <Tooltip label="Tipo de asamblea" color={"white"} aria-label="Tipo de asamblea">
                                <Select required name="tipoAsamblea" id='tipoAsamblea' onChange={handleChange}>
                                    <option value="">Seleccione un tipo de asamblea</option>
                                    <option value="resolutiva">Resolutiva</option>
                                    <option value="informativa">Informativa</option>
                                </Select>
                            </Tooltip>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Fecha</FormLabel>
                            <Tooltip label="Fecha de realización" color={"white"} aria-label="Fecha de realización">
                                <Input required name="fecha" id='fecha' type="datetime-local" onChange={handleChange} />
                            </Tooltip>
                        </FormControl>
                    </HStack>
                    <FormControl isRequired mt={4}>
                        <FormLabel>Lugar</FormLabel>
                        <Tooltip label="Formato de asamblea" color={"white"} aria-label="Formato de asamblea">
                            <Select required name="lugar" id='lugar' onChange={handleChangeLugar}>
                                <option value="">Seleccione un lugar</option>
                                <option value="online">Online</option>
                                <option value="presencial">Presencial</option>
                            </Select>
                        </Tooltip>
                    </FormControl>
                    <FormControl isRequired mt={4}>
                        <Collapse in={lugar !== ''}>
                            {wawa()}
                        </Collapse>
                    </FormControl>
                    {puntos.map((punto, index) => {
                        return (
                            <Puntos key={index} handleChangePunto={handleChangePunto} id={punto.id} ultimo={puntos.length} handleDeletePunto={handleDeletePunto} />
                        )
                    })
                    }
                    {puntos.length < 8 ?
                        <FormControl>
                            <HStack mt={4} align={"center"} justify={"center"}>
                                <FaPlus size={20} onClick={handleAddPunto} />
                                <Link mt={4} colorScheme="blue" onClick={handleAddPunto}>Agregar Punto</Link>
                            </HStack>
                        </FormControl>
                        : null}

                    <HStack mt={10} mb={10}>
                        <Button colorScheme="red" onClick={() => router.push("/asambleas")} w={"full"} > Cancelar </Button>
                        <Button colorScheme="green" onClick={() => handleSubmit()} w={"full"} > Crear Asamblea </Button>
                    </HStack>
                </Container>
            </ChakraProvider>
        </>
    )

}

export default crear