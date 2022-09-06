import { HStack, Heading, Box, useMediaQuery } from '@chakra-ui/react'


const ListaCards = ({ Terminadas, PorRealizar }) => {
    const [isMobile] = useMediaQuery("(max-width: 768px)")

    if (isMobile) {
        return (
            <Box align={"baseline"}>
                <Box mt="5">
                    <Heading as="h2" size="xl" textAlign={"center"}>Asambleas por realizar</Heading>
                    {PorRealizar()}
                </Box>
                <Box mt="5">
                    <Heading as="h2" size="xl" textAlign={"center"} >Asambleas terminadas</Heading>
                    {Terminadas()}
                </Box>
            </Box>
        )
    } else {
        return (
            <HStack align={"baseline"}>
                <Box mt="5">
                    <Heading as="h2" size="xl" textAlign={"center"}>Asambleas por realizar</Heading>
                    {PorRealizar()}
                </Box>
                <Box mt="5">
                    <Heading as="h2" size="xl" textAlign={"center"} >Asambleas terminadas</Heading>
                    {Terminadas()}
                </Box>
            </HStack>
        )
    }
}

export default ListaCards