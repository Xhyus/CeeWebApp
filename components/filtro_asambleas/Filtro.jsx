import React from 'react'
import { ChakraProvider, FormControl, FormLabel, Input, Button, Select, HStack, Center, Box } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa';

const Filtro = ({ filtrarInformacion, handleChangeFiltros }) => {
    return (
        <>
            <ChakraProvider>
                <Box border={"2px"} borderColor={'gray.100'} borderRadius={'lg'} p={5} m={5}>
                    <HStack mt={5}>
                        <FormControl w={"full"}>
                            <FormLabel>Estado</FormLabel>
                            <Select placeholder="Selecciona un estado" name="estado" onChange={handleChangeFiltros}>
                                <option value="terminada">Terminada</option>
                                <option value="noTerminada">Por realizar</option>
                            </Select>
                        </FormControl>
                        <FormControl w={"full"}>
                            <FormLabel>Tipo</FormLabel>
                            <Select placeholder="Selecciona un tipo" name="tipoAsamblea" onChange={handleChangeFiltros}>
                                <option value="informativa">Informativa</option>
                                <option value="resolutiva">Resolutiva</option>
                            </Select>
                        </FormControl>
                    </HStack>
                    <HStack mt={5}>
                        <FormControl w={[145, "full"]}>
                            <FormLabel>Fecha de inicio</FormLabel>
                            <Input type="date" name="inicio" onChange={handleChangeFiltros} />
                        </FormControl>
                        <FormControl w={[145, "full"]}>
                            <FormLabel>Fecha de fin</FormLabel>
                            <Input type="date" name="fin" onChange={handleChangeFiltros} />
                        </FormControl>
                    </HStack>
                    <Center mt={5}>
                        <Button colorScheme="blue" w={500} leftIcon={<FaSearch />} onClick={() => filtrarInformacion()}>Buscar</Button>
                    </Center>
                </Box>
            </ChakraProvider>
        </>
    )
}

export default Filtro