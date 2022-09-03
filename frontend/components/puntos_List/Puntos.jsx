import React from 'react'
import handleUpperCase from '../../utils/handleUpperCase'
import { List, ListItem, HStack, Text, UnorderedList } from '@chakra-ui/react'
const puntos = ({ puntos }) => {
    return (
        <List spacing={3} mt={5}>
            {puntos.map((punto, index) => (
                <UnorderedList key={index}>
                    <ListItem>
                        <HStack>
                            <Text fontSize="md" fontWeight="bold">Punto {index + 1}:</Text>
                            <Text fontSize="md">{handleUpperCase(punto.asunto)}</Text>
                        </HStack>
                    </ListItem>
                </UnorderedList>
            ))}
        </List>
    )
}

export default puntos