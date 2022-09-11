import React from 'react';
import { useRouter } from 'next/router'
import { Box, Link, HStack, ChakraProvider, Image, Drawer, DrawerOverlay, DrawerContent, DrawerFooter, DrawerCloseButton, useMediaQuery, Stack, useDisclosure, Button, DrawerHeader, DrawerBody } from "@chakra-ui/react"
import { FaBars } from 'react-icons/fa';
const Navbar = () => {

	const [isMobile] = useMediaQuery("(max-width: 600px)")
	const router = useRouter()
	const path = router.pathname.split('/')
	const currentPage = (boton) => {
		if (path[1] === 'asambleas' && boton === 'asambleas') {
			return "orange.300"
		} else {
			if (path[1] === 'rendicion_cuentas' && boton === 'rendicion_cuentas') {
				return "orange.300"
			} else {
				return "blue.500"
			}
		}
	}

	const currentPageMobile = (boton) => {
		if (path[1] === 'asambleas' && boton === 'asambleas') {
			return "orange"
		} else {
			if (path[1] === 'rendicion_cuentas' && boton === 'rendicion_cuentas') {
				return "orange"
			} else {
				return "black"
			}
		}
	}

	const desk = () => {
		return (
			<Box backgroundColor={"blue.500"}>
				<HStack justify={"space-between"} ml={5} mr={5}>
					<Image src="/logo-ubb-blanco.png" width={'30'} height={'20'} />
					<HStack spacing={8}>
						<Link _hover={"none"} color={"white"} borderBottom={"2px"} borderColor={currentPage("asambleas")} fontWeight={"bold"} onClick={() => router.push('asambleas')} >Asambleas</Link>
						<Link _hover={"none"} color={"white"} fontWeight={"bold"} borderBottom={"2px"} borderColor={currentPage("rendicion_cuentas")} onClick={() => router.push('rendicion_cuentas')} >Rendición Cuentas</Link>
						<Link _hover={"none"} color={"white"} fontWeight={"bold"} onClick={() => router.push('/')} >Cerrar Sesión</Link>
					</HStack>
				</HStack>
			</Box>
		)
	}

	const DrawerMobile = () => {
		const { isOpen, onOpen, onClose } = useDisclosure()
		const btnRef = React.useRef()
		return (
			<>
				<Box m={5} borderBottom={'2px'} borderColor={"gray.300"} pb={2}>
					<FaBars size={30} ref={btnRef} onClick={onOpen} />
				</Box>
				<Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>
							<Image src="/logo-ubb-negro.png" alt="logo" />
						</DrawerHeader>
						<DrawerBody justifyContent={"center"}>
							<Stack>
								<Link color={currentPageMobile("asambleas")} fontWeight={"bold"} onClick={() => router.push('asambleas')} >Asambleas</Link>
								<Link color={currentPageMobile("rendicion_cuentas")} fontWeight={"bold"} borderBottom={currentPage} onClick={() => router.push('rendicion_cuentas')} >Rendición Cuentas</Link>
							</Stack>
						</DrawerBody>
						<DrawerFooter justifyContent={"center"}>
							<Button colorScheme={"red"} fontWeight={"bold"} onClick={() => router.push('/')} >Cerrar Sesión</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer >
			</>
		)
	}

	return (
		<ChakraProvider>
			{isMobile ? <DrawerMobile /> : desk()}
		</ChakraProvider>
	)
}
export default Navbar