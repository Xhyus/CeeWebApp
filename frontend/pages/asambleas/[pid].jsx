import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { formateoFechaBD } from '../../utils/handleDates'
import handleUpperCase from '../../utils/handleUpperCase'
import Puntos from '../../components/puntos_List/Puntos'
import downloadFile from '../../data/asambleas/downloadFile'
import Swal from 'sweetalert2'
import { Container, Heading, ChakraProvider, Button, Link, HStack, Center, Spinner, Text, Highlight, ListItem, List, ListIcon, Box, CheckCircleIcon, UnorderedList } from '@chakra-ui/react'


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
        puntos: [],
        archivos: [],
    })
    const { pid } = router.query
    const [puntos, setPuntos] = useState([])
    const [count, setCount] = useState(0)
    const [archivos, setArchivos] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getAsamblea = (pid) => {
            axios.get(process.env.SERVIDOR + '/asamblea/' + pid)
                .then(res => {
                    setAsamblea({
                        asunto: handleUpperCase(res.data.asunto),
                        fecha: formateoFechaBD(res.data.fecha),
                        tipoAsamblea: handleUpperCase(res.data.tipoAsamblea),
                        contexto: handleUpperCase(res.data.contexto),
                        acta: res.data.acta,
                        ubicacion: handleUpperCase(res.data.ubicacion),
                        url: res.data.url,
                    })
                    localStorage.setItem('asunto', res.data.asunto)
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
                    console.log("Error al obtener una asamblea")
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

    if (isLoading) {
        return (
            <ChakraProvider>
                <Center h="92.5vh">
                    <Spinner size="xl" />
                </Center>
            </ChakraProvider>
        )
    }

    const showFiles = () => {
        if (archivos.length > 0) {
            return (
                <Box>
                    <Heading size="md" mt="5" mb="2">Archivos</Heading>
                    <UnorderedList>
                        {archivos.map(archivo => {
                            return (
                                <ListItem key={archivo.id}>
                                    <Link onClick={() => downloadFile(archivo)} download>
                                        <Text fontSize={"xl"}>{handleUpperCase(archivo.nombre)}</Text>
                                    </Link>
                                </ListItem>
                            )
                        })}
                    </UnorderedList>
                </Box>
            )
        }
    }

    return (
        <>
            <ChakraProvider>
                <Container maxW="container.lg">
                    <Heading as="h1" size="xl" color="black" textAlign="center" mt="10" mb="5">{asamblea.asunto}</Heading>
                    <HStack spacing="24px" mt={5}>
                        <Text fontSize="xl" fontWeight="bold">Tipo Asamblea: </Text>
                        <Text fontSize="xl">{asamblea.tipoAsamblea}</Text>
                    </HStack>
                    <HStack spacing="24px" mt={5}>
                        <HStack >
                            <Text fontSize="xl" fontWeight="bold">Fecha: </Text>
                            <Text fontSize="xl">{asamblea.fecha.fecha}</Text>
                        </HStack>
                        <HStack>
                            <Text fontSize="xl" fontWeight="bold">Hora: </Text>
                            <Text fontSize="xl">{asamblea.fecha.hora}</Text>
                        </HStack>
                    </HStack>
                    <HStack spacing="24px" mt={5}>
                        {asamblea.url ? <Text fontSize="xl" fontWeight="bold">Plataforma: </Text> : <Text fontSize="xl" fontWeight="bold">Ubicacion: </Text>}
                        <Text fontSize="xl">{asamblea.ubicacion}</Text>
                    </HStack>
                    {asamblea.url ? <HStack spacing="24px" mt={5}>
                        <Text fontSize="xl" fontWeight="bold">URL: </Text>
                        <Link href={asamblea.url} isExternal>
                            <Text fontSize="xl" color="blue.500">{asamblea.url}</Text>
                        </Link>
                    </HStack> : null}
                    <Box spacing="24px" justify={"flex-start"} mt={5}>
                        <Text fontSize="xl" fontWeight="bold">Contexto: </Text>
                        <Text fontSize="xl">{asamblea.contexto}</Text>
                    </Box>
                    <HStack spacing="24px" mt={5}>
                        <Text fontSize="xl" fontWeight="bold">Estado: </Text>
                        <Text fontSize="xl" fontWeight={"bold"} color={asamblea.fecha.estado == "Terminado" ? "red" : "green"}>{asamblea.fecha.estado == "Finalizada" ? "Finalizada" : "En proceso"}</Text>
                    </HStack>
                    <Heading as="h4" size="md" color="black" textAlign="start" mt="5" >Puntos a tratar</Heading>
                    <List spacing={3} mt={5}>
                        {puntos.map((punto, index) => (
                            <UnorderedList key={index}>
                                <ListItem>
                                    <HStack>
                                        <Text fontSize="xl" fontWeight="bold">Punto {index + 1}:</Text>
                                        <Text fontSize="xl">{punto.asunto}</Text>
                                    </HStack>
                                </ListItem>
                            </UnorderedList>
                        ))}
                    </List>
                    {showFiles()}

                    <HStack spacing="24px" mt={10} mb={10}>
                        <Button colorScheme="green" w={"full"} onClick={() => console.log("Adjuntar archivos")}>Adjuntar archivos</Button>
                        <Button colorScheme="orange" w={"full"} onClick={() => console.log("editar")}>Editar</Button>
                        <Button colorScheme="red" w={"full"} onClick={() => router.push(`/asambleas`)}>Atras</Button>
                    </HStack>
                </Container>
            </ChakraProvider>
        </>
    )
}
export default verAsamblea