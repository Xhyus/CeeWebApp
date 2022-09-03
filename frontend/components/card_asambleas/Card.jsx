import React, { useEffect, useState } from 'react'
// import styles from './Card.module.css'
import { FaClock, FaTag, FaCalendarCheck } from 'react-icons/fa'
import { compararFechas, formateoFechaBD } from '../../utils/handleDates'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'
import handleUpperCase from '../../utils/handleUpperCase'
import { Box, Heading, Text, Button, HStack, Tag, TagLabel } from "@chakra-ui/react"

const Card = ({ id, asunto, fecha, tipoAsamblea, estado }) => {
	const [format, setFormat] = useState('')
	const router = useRouter()

	useEffect(() => {
		setFormat(formateoFechaBD(fecha))
	}, [])

	const getEstadoAsamblea = () => {
		if (estado === "Terminadas") {
			return (
				<Tag size={"lg"} variant='subtle' colorScheme='red'>
					<FaTag />
					<TagLabel ml={1}>Terminadas</TagLabel>
				</Tag>
			)
		} else {
			return (
				<Tag size={"lg"} variant='subtle' colorScheme='green'>
					<FaTag />
					<TagLabel ml={1}>No Terminadas</TagLabel>
				</Tag>
			)
		}
	}

	return (

		<Box key={id} mt={5} pt={5} pb={5} pr={10} pl={10} shadow="md" borderWidth="1px" borderRadius={'3xl'}>
			<Box w={"full"}>
				<HStack >
					{getEstadoAsamblea()}
				</HStack>
				<Heading mt={5} as="h4" size="md">{handleUpperCase(asunto)}</Heading>
				<HStack mt={3}>
					<Text>Tipo: {handleUpperCase(tipoAsamblea)}</Text>
				</HStack>
				<HStack mt={3} justify={"space-between"}>
					<HStack >
						<FaCalendarCheck />
						<Text>Fecha: {format.fecha}</Text>
					</HStack>
					<HStack>
						<FaClock />
						<Text >Hora: {format.hora}</Text>
					</HStack>
				</HStack>
				<Button mt={3} w={"full"} colorScheme={"yellow"} onClick={() => router.push(`/asambleas/${id}`)}>Ver más</Button>
			</Box >
		</Box >
	)
}

export default Card