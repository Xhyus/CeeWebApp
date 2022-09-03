import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { formateoFechaBD } from '../../utils/handleDates'
import handleUpperCase from '../../utils/handleUpperCase'
import Puntos from '../../components/puntos_List/Puntos'
import Swal from 'sweetalert2'
import { Container, Heading, ChakraProvider, Button, Link, HStack, Text, ListItem, Box, UnorderedList, FormControl, Input, color } from '@chakra-ui/react'
import Archivos from '../../components/archivosList/Archivos'
import SpinnerLoading from '../../components/spinner/SpinnerLoading'
import UploadImages from '../../components/UploadImages/UploadImages'

const verAsamblea = () => {
    const router = useRouter()
    const [asamblea, setAsamblea] = useState({
        asunto: '',
        fecha: '',
        tipoAsamblea: '',
        contexto: '',
        acta: '',
        ubicacion: '',
        url: '',
        horaTermino: '',
        puntos: [],
        archivos: [],
    })
    const { pid } = router.query
    const [puntos, setPuntos] = useState([])
    const [count, setCount] = useState(0)
    const [archivos, setArchivos] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getAsamblea = async (pid) => {
            await axios.get(process.env.SERVIDOR + '/asamblea/' + pid)
                .then(res => {
                    setAsamblea({
                        asunto: handleUpperCase(res.data.asunto),
                        fecha: formateoFechaBD(res.data.fecha),
                        tipoAsamblea: handleUpperCase(res.data.tipoAsamblea),
                        contexto: handleUpperCase(res.data.contexto),
                        acta: res.data.acta,
                        ubicacion: handleUpperCase(res.data.ubicacion),
                        url: res.data.url,
                        horaTermino: res.data.horaTermino,
                    })
                    let puntos = [...res.data.puntos]
                    puntos.map(punto => {
                        obtenerPunto(punto)
                    })
                    let archivos = [...res.data.archivos]
                    archivos.map(archivo => {
                        obtenerInformacionArchivo(archivo)
                    })
                    setIsLoading(false)
                })
                .catch(err => {
                    router.push('/asambleas')
                })
        }
        localStorage.setItem('pid', pid);
        if (count === 1) {
            getAsamblea(pid)
        } else {
            if (pid !== undefined) {
                getAsamblea(pid)
            }
        }
        setCount(1)
    }, [pid])

    const obtenerInformacionArchivo = (id) => {
        axios.get(process.env.SERVIDOR + '/archivo/' + id)
            .then(res => {
                setArchivos(archivo => [...archivo, res.data])
            })
            .catch(err => {
                console.log("Error al obtener un archivo")
            })
    }

    const obtenerPunto = (id) => {
        axios.get(process.env.SERVIDOR + '/punto/search/' + id)
            .then(res => {
                setPuntos(puntos => [...puntos, res.data])
            })
            .catch(err => {
                console.log("Error al obtener un solo punto")
            })
    }

    const editarAsamblea = () => {
        return (
            Swal.fire({
                title: '<strong>Añadir hora de termino de asamblea</strong>',
                icon: 'question',
                html:
                    '<FormControl>' +
                    '<Label><Strong>Hora:</Strong></Label> <Input type="time" id="horaTermino" />' +
                    '</FormControl>',

                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText:
                    'Enviar',
                cancelButtonText:
                    'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    let horaTermino = document.getElementById('horaTermino').value
                    if (horaTermino === '') {
                        Swal.fire({
                            title: 'Error',
                            text: 'Debe ingresar una hora de termino',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        })
                    } else {
                        axios.put(process.env.SERVIDOR + '/asamblea/update/hora/' + pid, { horaTermino: horaTermino })
                            .then(res => {
                                Swal.fire({
                                    title: 'Exito',
                                    text: 'Hora de termino de asamblea actualizada',
                                    icon: 'success',
                                    confirmButtonText: 'Aceptar'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.reload()
                                    }
                                })
                            })
                            .catch(err => {
                                Swal.fire({
                                    title: 'Error',
                                    text: 'Error al actualizar hora de termino',
                                    icon: 'error',
                                    confirmButtonText: 'Aceptar'
                                })
                            })
                    }
                }
            })
        )
    }

    const showHoraTermino = () => {
        if (asamblea.horaTermino === '' || asamblea.horaTermino === undefined || asamblea.horaTermino === null) {
            return null
        } else {
            return (
                <Text fontSize="lg" mt={2} mb={2} fontWeight={"bold"}>
                    Hora de termino: {asamblea.horaTermino}
                </Text>
            )
        }
    }

    const color = () => {
        if ((asamblea.horaTermino == '' || asamblea.horaTermino == undefined || asamblea.horaTermino == null) && asamblea.fecha.estado == 'Finalizado') {
            return "orange"
        } else {
            return "gray"
        }
    }

    const disable = () => {
        if ((asamblea.horaTermino == '' || asamblea.horaTermino == undefined || asamblea.horaTermino == null) && asamblea.fecha.estado == 'Finalizado') {
            return false
        } else {
            return true
        }
    }

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    return (
        <>
            <ChakraProvider>
                <Container maxW="container.lg">
                    <Heading as="h1" size="xl" color="black" textAlign="center" mt={10}>{asamblea.asunto}</Heading>
                    <HStack spacing="24px" mt={10} >
                        <Text fontSize="lg" fontWeight="bold">Tipo Asamblea: </Text>
                        <Text fontSize="lg">{asamblea.tipoAsamblea}</Text>
                    </HStack>
                    <HStack mt={5}>
                        <Text fontSize="lg" fontWeight="bold">Fecha: </Text>
                        <Text fontSize="lg">{asamblea.fecha.fecha}</Text>
                    </HStack>
                    <HStack mt={5}>
                        <Text fontSize="lg" fontWeight="bold">Hora: </Text>
                        <Text fontSize="lg">{asamblea.fecha.hora}</Text>
                    </HStack>
                    <HStack mt={5}>
                        {asamblea.url ? <Text fontSize="lg" fontWeight="bold" mt={5}>Plataforma: </Text> : <Text fontSize="xl" fontWeight="bold">Ubicacion: </Text>}
                        <Text fontSize="lg" mt={5}>{asamblea.ubicacion}</Text>
                    </HStack>
                    <HStack spacing="24px" mt={5}>
                        <Text fontSize="lg" fontWeight="bold">Estado: </Text>
                        <Text fontSize="lg" fontWeight={"bold"} color={asamblea.fecha.estado == "Finalizado" ? "red" : "green"}>{asamblea.fecha.estado == "Finalizado" ? "Finalizado" : "En proceso"}</Text>
                        {showHoraTermino()}
                    </HStack>
                    {asamblea.url ? <HStack mt={5}>
                        <Text fontSize="lg" fontWeight="bold">URL: </Text>
                        <Link href={asamblea.url} isExternal>
                            <Text fontSize="lg" color="blue.500">{asamblea.url}</Text>
                        </Link>
                    </HStack> : null}
                    <Box spacing="24px" justify={"flex-start"} mt={5}>
                        <Text fontSize="lg" fontWeight="bold">Contexto: </Text>
                        <Text fontSize="lg">{asamblea.contexto}</Text>
                    </Box>
                    <Heading as="h4" size="lg" color="black" textAlign="start" mt="5" >Puntos a tratar</Heading>
                    <Puntos puntos={puntos} />
                    <Archivos archivos={archivos} />
                    <HStack mt={10} mb={10}>
                        <Button colorScheme="green" w={"full"} onClick={async () => { localStorage.setItem("pid", pid), await UploadImages(router) }}>Adjuntar archivos</Button>
                        <Button colorScheme={color()} w={"full"} disabled={disable()} onClick={() => { localStorage.setItem("pid", pid), editarAsamblea() }}>Editar</Button>
                        <Button colorScheme="red" w={"full"} onClick={() => router.push(`/asambleas`)}>Atras</Button>
                    </HStack>
                </Container>
            </ChakraProvider>
        </>
    )
}
export default verAsamblea