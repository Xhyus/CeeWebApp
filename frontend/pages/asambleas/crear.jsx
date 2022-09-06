import React, { useState, useEffect } from 'react'
import { isLogged } from '../../utils/logged'
import Puntos from '../../components/puntos/Puntos'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { Container, Heading, ChakraProvider, FormControl, FormLabel, Input, Button, Select, Link, Textarea, HStack, Center, Spinner, Collapse, Tooltip, Text } from '@chakra-ui/react'
import { Formik } from 'formik'
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

    const wawa = (values, touched, errors, handleChange, handleBlur) => {
        if (lugar === '') {
            return null
        }
        if (lugar == 'online') {
            return (
                <HStack mb={5}>
                    <FormControl >
                        <FormLabel>Ubicacion</FormLabel>
                        <Tooltip label="Plataforma a utilizar" color={"white"} aria-label="Plataforma a utilizar">
                            <Input onBlur={handleBlur} value={values.ubicacion} type="text" name="ubicacion" onChange={handleChange} placeholder="Ejemplo: Discord, Zoom, Etc." />
                        </Tooltip>
                    </FormControl>
                    {touched.ubicacion && errors.ubicacion && (
                        <Text color={"red"}>{errors.ubicacion}</Text>
                    )}
                    <FormControl  >
                        <FormLabel>Url</FormLabel>
                        <Tooltip label="URL de la plataforma para entrar a la asamblea" color={"white"} aria-label="URL de la plataforma para entrar a la asamblea">
                            <Input onBlur={handleBlur} value={values.url} type="url" name="url" onChange={handleChange} placeholder="www.google.cl" />
                        </Tooltip>
                    </FormControl>
                    {touched.url && errors.url && (
                        <Text color={"red"}>{errors.url}</Text>
                    )}
                </HStack>
            )
        }
        if (lugar == 'presencial') {
            return (
                <FormControl mb={5}>
                    <FormLabel>Ubicacion</FormLabel>
                    <Tooltip label="Lugar donde se realizara la asamblea" color={"white"} aria-label="Lugar donde se realizara la asamblea">
                        <Input onBlur={handleBlur} value={values.ubicacion} type="text" name="ubicacion" onChange={handleChange} placeholder="Ejemplo: FACE Sala 103CE" />
                    </Tooltip>
                    {touched.ubicacion && errors.ubicacion && (
                        <Text color={"red"}>{errors.ubicacion}</Text>
                    )}
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

    const initialValues = {
        asunto: '',
        fecha: '',
        tipoAsamblea: '',
        contexto: '',
        ubicacion: '',
        url: '',
    }

    return (
        <>
            <ChakraProvider>
                <Container maxW={"container.md"}>
                    <HStack align={"center"} justify={"center"} mt={10}>
                        <FaPlusCircle size={30} />
                        <Heading>Crear Asamblea</Heading>
                    </HStack>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validacion}
                        onSubmit={(values) => {
                            setIsLoading(true)
                            let carrera = localStorage.getItem('carrera')
                            axios.post(process.env.SERVIDOR + '/asamblea/' + carrera, {
                                asunto: values.asunto,
                                fecha: values.fecha,
                                tipoAsamblea: values.tipoAsamblea,
                                contexto: values.contexto,
                                ubicacion: values.ubicacion,
                                url: values.url
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
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit} id="form">
                                <FormControl mt={4}>
                                    <FormLabel>Asunto</FormLabel>
                                    <Tooltip label="Nombre o tema destacado de la asamblea" color={"white"} aria-label="Nombre o tema destacado de la asamblea">
                                        <Input onBlur={handleBlur} maxLength={100} value={values.asunto} name="asunto" id='asunto' type="text" placeholder="Asunto asamblea" onChange={handleChange} />
                                    </Tooltip>
                                </FormControl>
                                {touched.asunto && errors.asunto && (
                                    <Text color={"red"}>{errors.asunto}</Text>
                                )}
                                <FormControl mt={4}>
                                    <FormLabel>Contexto</FormLabel>
                                    <Tooltip label="Contexto de la asamblea" color={"white"} aria-label="Contexto de la asamblea">
                                        <Textarea onBlur={handleBlur} value={values.contexto} name="contexto" id='contexto' type="text" placeholder="Contexto asamblea" onChange={handleChange} resize={"none"} minH={200} />
                                    </Tooltip>
                                </FormControl>
                                {touched.contexto && errors.contexto && (
                                    <Text color={"red"}>{errors.contexto}</Text>
                                )}
                                <HStack mt={4}>
                                    <FormControl  >
                                        <FormLabel>Tipo asamblea</FormLabel>
                                        <Tooltip label="Tipo de asamblea" color={"white"} aria-label="Tipo de asamblea">
                                            <Select onBlur={handleBlur} value={values.tipoAsamblea} name="tipoAsamblea" id='tipoAsamblea' onChange={handleChange}>
                                                <option value="">Seleccione un tipo de asamblea</option>
                                                <option value="resolutiva">Resolutiva</option>
                                                <option value="informativa">Informativa</option>
                                            </Select>
                                        </Tooltip>
                                    </FormControl>
                                    {touched.tipoAsamblea && errors.tipoAsamblea && (
                                        <Text color={"red"}>{errors.tipoAsamblea}</Text>
                                    )}
                                    <FormControl >
                                        <FormLabel>Fecha</FormLabel>
                                        <Tooltip label="Fecha de realización" color={"white"} aria-label="Fecha de realización">
                                            <Input onBlur={handleBlur} value={values.fecha} name="fecha" id='fecha' type="datetime-local" onChange={handleChange} />
                                        </Tooltip>

                                    </FormControl>
                                </HStack>
                                {touched.fecha && errors.fecha && (
                                    <Text color={"red"}>{errors.fecha}</Text>
                                )}
                                <FormControl mt={4}>
                                    <FormLabel>Lugar</FormLabel>
                                    <Tooltip label="Formato de asamblea" color={"white"} aria-label="Formato de asamblea">
                                        <Select onBlur={handleBlur} value={values.lugar} name="lugar" id='lugar' onChange={handleChangeLugar}>
                                            <option value="">Seleccione un lugar</option>
                                            <option value="online">Online</option>
                                            <option value="presencial">Presencial</option>
                                        </Select>
                                    </Tooltip>
                                </FormControl>
                                <FormControl mt={4}>
                                    <Collapse in={lugar !== ''}>
                                        {wawa(values, touched, errors, handleChange, handleBlur)}
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
                                    <Button colorScheme="green" type={"submit"} w={"full"} > Crear Asamblea </Button>
                                </HStack>
                            </form>
                        )}
                    </Formik>


                </Container>
            </ChakraProvider>
        </>
    )

}

export default crear