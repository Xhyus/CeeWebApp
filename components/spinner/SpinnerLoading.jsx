import React from 'react'
import { Spinner, Center, ChakraProvider } from '@chakra-ui/react'


export default function SpinnerLoading() {
    return (
        <ChakraProvider>
            <Center h="92.5vh">
                <Spinner size="xl" />
            </Center>
        </ChakraProvider>
    )
}
