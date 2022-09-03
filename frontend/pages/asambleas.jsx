import { useState, useEffect } from 'react'
import Card from './../components/card_asambleas/Card'
import axios from 'axios'
import { FaPlus, FaFilter } from 'react-icons/fa'
import { useRouter } from 'next/router'
import Filtro from '../components/filtro_asambleas/Filtro'
import SpinnerLoading from '../components/spinner/SpinnerLoading'
import { Container, Heading, ChakraProvider, Button, Collapse, HStack, Center, Spinner, Box, useMediaQuery } from '@chakra-ui/react'
import Swal from 'sweetalert2'


export default function asambleas() {
	const [asambleasTerminadas, setAsambleasTerminadas] = useState([])
	const [asambleasPorRealizar, setAsambleasPorRealizar] = useState([])
	const [filtro, setFiltro] = useState(false)
	const [informacion, setInformacion] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()
	const [openFiltro, setOpenFiltro] = useState(false)
	const [isMobile] = useMediaQuery("(max-width: 768px)")


	useEffect(() => {
		(async () => {
			isLogged()
			getAsambleas()
		})();
	}, []);

	const isLogged = () => {
		if (localStorage.getItem('token') === null) {
			router.push('/')
		}
	}

	const getAsambleas = async () => {
		const carrera = localStorage.getItem('carrera')
		try {
			const response = await axios.get(`${process.env.SERVIDOR}/asambleas/${carrera}`)
			if (response.status === 200) {
				setAsambleasTerminadas(response.data.asambleasTerminadas)
				setAsambleasPorRealizar(response.data.asambleasNoTerminadas)
				setIsLoading(false)
			}
		}
		catch (error) {
			console.log("Error: " + error)
		}
	}

	const Terminadas = () => {
		if (asambleasTerminadas.length > 0) {
			return (
				<div>
					{asambleasTerminadas.map((asamblea, key) => {
						return <Card key={key} asunto={asamblea.asunto} fecha={asamblea.fecha} tipoAsamblea={asamblea.tipoAsamblea} id={asamblea._id} estado="Terminadas" />
					})}
				</div>
			)
		} else {
			return (
				<Text>No hay asambleas terminadas</Text>
			)
		}
	}

	const PorRealizar = () => {
		if (asambleasPorRealizar.length > 0) {
			return (
				<div>
					{asambleasPorRealizar.map((asamblea, key) => {
						return <Card key={key} asunto={asamblea.asunto} fecha={asamblea.fecha} tipoAsamblea={asamblea.tipoAsamblea} id={asamblea._id} estado="PorRealizar" />
					})}
				</div>
			)
		} else {
			return (
				<Text>No hay asambleas por realizar</Text>
			)
		}
	}

	const Computador = () => {
		return (
			<HStack align={"baseline"}>
				<Box mt="5">
					<Heading as="h2" size="xl" textAlign={"center"}>Asambleas por realizar</Heading>
					<PorRealizar />
				</Box>
				<Box mt="5">
					<Heading as="h2" size="xl" textAlign={"center"} >Asambleas terminadas</Heading>
					<Terminadas />
				</Box>
			</HStack>
		)
	}

	const Telefono = () => {
		return (
			<Box align={"baseline"}>
				<Box mt="5">
					<Heading as="h2" size="xl" textAlign={"center"}>Asambleas por realizar</Heading>
					<PorRealizar />
				</Box>
				<Box mt="5">
					<Heading as="h2" size="xl" textAlign={"center"} >Asambleas terminadas</Heading>
					<Terminadas />
				</Box>
			</Box>
		)
	}

	const FiltroActivo = async () => {
		return (
			await informacion.length > 0 ? informacion.map((asamblea, index) => {
				return (
					<Card key={index} asunto={asamblea.asunto} fecha={asamblea.fecha} tipoAsamblea={asamblea.tipoAsamblea} id={asamblea._id} estado={asamblea.fecha >= new Date() ? "PorRealizar" : "Terminadas"} />
				)
			}) :
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'No hay asambleas con ese filtro',
				}).then(() => {
					setFiltro(false)
				})
		)
	}

	if (isLoading) {
		return (
			<SpinnerLoading />
		)
	}

	return (
		<ChakraProvider>
			<Container maxW={"container.lg"}>
				<Box verticalAlign={"flex-start"}>
					<HStack justify={"center"} mt={10}>
						<Button colorScheme="green" w={"full"} onClick={() => router.push('asambleas/crear')} leftIcon={<FaPlus />}>Crear asamblea</Button>
						<Button colorScheme="blue" w={"full"} onClick={() => setOpenFiltro(!openFiltro)} leftIcon={<FaFilter />}>Abrir Filtro</Button>
					</HStack>
					<Collapse in={openFiltro} animateOpacity>
						<Filtro setFiltro={setFiltro} setInformacion={setInformacion} />
					</Collapse>
				</Box>
				{filtro === true ? <FiltroActivo /> :
					isMobile ? <Telefono /> : <Computador />
				}
			</Container>
		</ChakraProvider >
	)
}