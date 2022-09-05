import React from "react";
import styles from "../styles/rendicion_cuentas.module.css";
import { ChakraProvider, HStack, Container, Box, Button, Heading } from "@chakra-ui/react";
import { FaPlus, FaFilter } from "react-icons/fa";
import SpinnerLoading from '../components/spinner/SpinnerLoading'
import Card_gasto from "../components/card_rendicion_cuentas/Card_gasto";
import Filtro from "../components/filtro/Filtro";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function rendicion_cuentas() {

	const [listaRendiciones, setListaRendiciones] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter()

	useEffect(() => {
		isLogged()
		console.log(".: Pantalla rendicion_cuentas :.");

		// Tipo de getRendicion por defecto 'rendiciones'
		(async () => getRendiciones("rendiciones"))();

	}, []);

	const isLogged = () => {
		if (localStorage.getItem('token') === null) {
			router.push('/')
		}
	}

	//* .: OBTENER GASTOS :. *//
	const getRendiciones = async (tipoGetRendiciones) => {

		try {
			const response = await axios.get(process.env.SERVIDOR + "/" + tipoGetRendiciones);

			// Estado: Ok
			if (response.status === 200) {
				setListaRendiciones(response.data);
				setIsLoading(false);
			}

		} catch (error) {
			console.log("Peticion: " + tipoGetRendiciones + "\nError: " + error);
		}
	}

	//* .: LISTAR GASTOS :. *//
	const ListarRendiciones = () => {
		if(listaRendiciones.length > 0){
			return (
				<Box w={"full"} justify={"center"}>
					{listaRendiciones.map((gasto, key) => {
						return <Card_gasto key={key} datos_gasto={gasto} />
					})}
				</Box>
			)
		}else{
			return (
				<Text>No hay gastos registrados</Text>
			)
		}
	}

	//* .: RENDERIZADO CONDICIONAL :. *//
	if (isLoading) {
		return (
			<SpinnerLoading />
		)
	}

	return (
		<ChakraProvider>
			<Container maxW={"container.md"}>
				<Box verticalAlign={"flex-start"}>
					<HStack justify={"center"} mt={10}>
						<Button colorScheme="green" w={"full"} onClick={() => router.push('rendicion_cuentas/crear_gasto')} leftIcon={<FaPlus />}>Crear gasto</Button>
						{/* <Button colorScheme="blue" w={"full"} onClick={() => console.log("Filtro")} leftIcon={<FaFilter />}>Abrir Filtro</Button> */}
					</HStack>
				</Box>
				<Box mt={10} verticalAlign={"flex-start"}>
					{ListarRendiciones()}
				</Box>
			</Container>
		</ChakraProvider>
	)
}
