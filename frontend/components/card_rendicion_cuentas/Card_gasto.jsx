import React from 'react'
import styles from './card_gasto.module.css'
import { Box, HStack, Heading, Text } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { FaCalendarCheck, FaDollarSign } from 'react-icons/fa';

const Card_Gasto = ({datos_gasto}) => {

    const verDetalleGasto = () => {

        console.log("Abriendo detalle del gasto ...");
        Swal.fire({
            icon: 'info',
            title: datos_gasto.asunto,
            //html: '',
            html: '<table width = "100%">' +
                    '<tr>' + 
                        '<th align = "left">Fecha:</th>' + 
                        '<td align = "right">' + datos_gasto.fecha + '</td>' + 
                    '</tr>' +
                    '<tr>' + 
                        '<th align = "left">Tipo:</th>' + 
                        '<td align = "right">' + datos_gasto.tipoGasto + '</td>' + 
                    '</tr>' +
                    '<tr>' + 
                        '<th align = "left">Detalle:</th>' + 
                        '<td align = "right">' + datos_gasto.detalle + '</td>' + 
                    '</tr>' +
                    '<tr>' + 
                        '<th align = "left">Total:</th>' + 
                        '<td align = "right">$' + datos_gasto.totalGastado + '</td>' + 
                    '</tr>' +
                '</table>' +
                //'<image src = "' + datos_gasto.imagen + '" width = "100%" height = "100%"></image>',
                '<image src = "http://webface.ubiobio.cl/wp-content/uploads/2019/01/face-ubb-02.png" width = "90%" height = "80%"></image>',
            confirmButtonText: 'Aceptar'
        })
    }
    return (
        <Box mt={5} pt={5} pb={5} pr={10} pl={10} shadow="md" borderWidth="1px" borderRadius={'3xl'}>
            <Box w={"md"}>
                <HStack mt={5}>
                    <Heading size={"md"}>{datos_gasto.asunto}</Heading>
                </HStack>
                <HStack mt={3}>
					<Text fontSize={"md"}><strong>Tipo:</strong> {datos_gasto.tipoGasto}</Text>
				</HStack>
                <HStack mt={3} justify={"space-between"}>
					<HStack>
                        <FaCalendarCheck size={20}/>
                        <Text fontSize={"md"}>{datos_gasto.fecha}</Text>
                    </HStack>
                    <HStack>
                        <FaDollarSign size={20}/>
                        <Text fontSize={"md"}>{datos_gasto.totalGastado}</Text>
                    </HStack>
				</HStack>
            </Box>
        </Box>
    )
}

export default Card_Gasto