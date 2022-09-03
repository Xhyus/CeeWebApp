import React, { useState } from 'react'
import axios from 'axios'
import { ChakraProvider, FormControl, FormLabel, Input, Button, Select, HStack, Center, Box } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Filtro = ({ setFiltro, setInformacion }) => {
    const ISSERVER = typeof window === "undefined";
    let carrera
    if (!ISSERVER) {
        carrera = localStorage.getItem('carrera')
    }
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
        if (data.estado === '' && data.tipoAsamblea === '' && data.inicio === '' && data.fin === '') {
            return (
                Swal.fire({
                    title: 'Error',
                    text: 'Debe llenar al menos un campo',
                    icon: 'error'
                })
            )
        }
        setFiltro(true)
        axios.get(`${process.env.SERVIDOR}/asambleas/filtros/${carrera}?estado=${data.estado}&tipo=${data.tipoAsamblea}&inicio=${data.inicio}&fin=${data.fin}`, data)
            .then(res => {
                setInformacion(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <ChakraProvider>
                <Box border={"2px"} borderColor={'gray.100'} borderRadius={'lg'} p={5} m={5}>
                    <HStack mt={5}>
                        <FormControl w={"full"}>
                            <FormLabel>Estado</FormLabel>
                            <Select placeholder="Selecciona un estado" name="estado" onChange={handleChange}>
                                <option value="terminadas">Terminada</option>
                                <option value="noTerminadas">Por realizar</option>
                            </Select>
                        </FormControl>
                        <FormControl w={"full"}>
                            <FormLabel>Tipo</FormLabel>
                            <Select placeholder="Selecciona un tipo" name="tipoAsamblea" onChange={handleChange}>
                                <option value="informativa">Informativa</option>
                                <option value="resolutiva">Resolutiva</option>
                            </Select>
                        </FormControl>
                    </HStack>
                    <HStack mt={5}>
                        <FormControl w={[145, "full"]}>
                            <FormLabel>Fecha de inicio</FormLabel>
                            <Input type="date" name="inicio" onChange={handleChange} />
                        </FormControl>
                        <FormControl w={[145, "full"]}>
                            <FormLabel>Fecha de fin</FormLabel>
                            <Input type="date" name="fin" onChange={handleChange} />
                        </FormControl>
                    </HStack>
                    <Center mt={5}>
                        <Button colorScheme="blue" w={500} leftIcon={<FaSearch />} onClick={() => filtrar()}>Buscar</Button>
                    </Center>
                </Box>
            </ChakraProvider>
        </>
    )
}

export default Filtro