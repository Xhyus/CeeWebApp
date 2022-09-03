import React from 'react'
import { Heading, ListItem, Box, Text, UnorderedList, Link } from '@chakra-ui/react'
import downloadFile from '../../data/asambleas/downloadFile'
import handleUpperCase from '../../utils/handleUpperCase'


const Archivos = ({ archivos }) => {
    if (archivos.length > 0) {
        return (
            <Box>
                <Heading size="md" mt="5" mb="2">Archivos</Heading>
                <UnorderedList>
                    {archivos.map(archivo => {
                        return (
                            <ListItem key={archivo.id}>
                                <Link onClick={() => downloadFile(archivo)} download>
                                    <Text fontSize={"xl"} color={"blue.500"}>{handleUpperCase(archivo.nombre)}</Text>
                                </Link>
                            </ListItem>
                        )
                    })}
                </UnorderedList>
            </Box>
        )
    }
}

export default Archivos