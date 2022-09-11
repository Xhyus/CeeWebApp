import { useState, useEffect } from 'react'
import Card from '../components/card_asambleas/Card'
import axios from 'axios'
import { FaPlus, FaFilter, FaTimes } from 'react-icons/fa'
import { useRouter } from 'next/router'
import SpinnerLoading from '../components/spinner/SpinnerLoading'
import { Container, ChakraProvider, Button, Collapse, HStack, Box, Heading, Text } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import ListaCards from '../components/Desktop/ListaCards'
import Filtro from '../components/filtro_asambleas/Filtro'

export default function asambleas() {
	const [asambleasTerminadas, setAsambleasTerminadas] = useState([])
	const [asambleasPorRealizar, setAsambleasPorRealizar] = useState([])
	const [filtros, setFiltros] = useState({
		fin: '',
		tipoAsamblea: '',
		inicio: '',
		estado: ''
	})
	const [filtrado, setFiltrado] = useState(false)
	const [informacionFiltrada, setInformacionFiltrada] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()
	const [openFiltro, setOpenFiltro] = useState(false)


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

	const handleChangeFiltros = (e) => {
		setFiltros({
			...filtros,
			[e.target.name]: e.target.value
		})
	}

	const filtrarInformacion = () => {
		if (filtros.estado === '' && filtros.tipoAsamblea === '' && filtros.inicio === '' && filtros.fin === '') {
			return (
				Swal.fire({
					title: 'Error',
					text: 'Debe llenar al menos un campo',
					icon: 'error'
				})
			)
		}
		let query = {
			estado: filtros.estado,
			tipoAsamblea: filtros.tipoAsamblea,
			inicio: filtros.inicio,
			fin: filtros.fin
		}
		let carrera = localStorage.getItem('carrera')
		axios.post(`${process.env.SERVIDOR}/asambleas/filtros/${carrera}`, query)
			.then(response => {
				setInformacionFiltrada(response.data)
				setOpenFiltro(false)
				setIsLoading(false)
				setFiltrado(true)
			})
			.catch(error => {
				console.log(error)
			})
	}

	const Terminadas = () => {
		if (asambleasTerminadas.length > 0) {
			return (
				<Box>
					{asambleasTerminadas.map((asamblea, key) => {
						return <Card key={key} asunto={asamblea.asunto} fecha={asamblea.fecha} tipoAsamblea={asamblea.tipoAsamblea} id={asamblea._id} estado="Terminadas" />
					})}
				</Box>
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
				<Box>
					{asambleasPorRealizar.map((asamblea, key) => {
						return <Card key={key} asunto={asamblea.asunto} fecha={asamblea.fecha} tipoAsamblea={asamblea.tipoAsamblea} id={asamblea._id} estado="PorRealizar" />
					})}
				</Box>
			)
		} else {
			return (
				<Text>No hay asambleas por realizar</Text>
			)
		}
	}


	const FiltroActivo = () => {
		if (informacionFiltrada.length > 0) {
			return (
				<Box my={5}>
					<Heading size={"lg"} textAlign={"center"}>Asambleas</Heading>
					<HStack alignItems={"center"}>
						<Heading size="md" >Resultados de la búsqueda</Heading>
						<Button colorScheme="gray" size='sm' leftIcon={<FaTimes />} onClick={() => { setFiltrado(false), setOpenFiltro(false) }}>Quitar filtro</Button>
					</HStack>
					{informacionFiltrada.map((asamblea, key) => {
						return <Card key={key} asunto={asamblea.asunto} fecha={asamblea.fecha} tipoAsamblea={asamblea.tipoAsamblea} id={asamblea._id} estado={new Date(asamblea.fecha) >= new Date() ? "PorRealizar" : "Terminadas"} />
					})}
				</Box>
			)
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'No hay asambleas con ese filtro',
			}).then(() => {
				setFiltrado(false)
			})
		}
	}

	if (isLoading) {
		return (
			<SpinnerLoading />
		)
	}

	return (
		<ChakraProvider>
			<Container maxW={"container.lg"} pb={10}>
				<Box verticalAlign={"flex-start"}>
					<HStack justify={"center"} mt={10}>
						<Button colorScheme="green" w={"full"} onClick={() => router.push('asambleas/crear')} leftIcon={<FaPlus />}>Crear asamblea</Button>
						<Button colorScheme="blue" w={"full"} onClick={() => setOpenFiltro(!openFiltro)} leftIcon={<FaFilter />}>Abrir Filtro</Button>
					</HStack>
					<Collapse in={openFiltro} animateOpacity>
						<Filtro handleChangeFiltros={handleChangeFiltros} filtrarInformacion={filtrarInformacion} />
					</Collapse>
				</Box>
				{filtrado ? FiltroActivo() : <ListaCards Terminadas={Terminadas} PorRealizar={PorRealizar} />}
			</Container>
		</ChakraProvider >
	)
}