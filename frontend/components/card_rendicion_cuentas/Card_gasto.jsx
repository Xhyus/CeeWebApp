import React from 'react'
import axios from "axios";
import { Box, HStack, Heading, Text, Button } from '@chakra-ui/react'
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
                '</table>',            
            confirmButtonText: 'Aceptar'
        })
    }

    const eliminarGasto = () => {
            Swal.fire({
                title: '¿Está seguro que desea eliminar el gasto?',
                text: "No podrá revertir esta acción.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {

                    //* Eliminar gasto.
                    axios.delete(process.env.SERVIDOR +'/rendicion/delete/' + datos_gasto._id)
                        .then((respuesta) => {
                            console.log("Solicitud eliminar gasto: " + respuesta);
                        })
                        .catch((error) => {
                            console.log("Error al eliminar gasto: " + error);
                        })

                    Swal.fire({
                        title: 'Eliminado!',
                        text: 'El gasto ha sido eliminado.',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Aceptar',
                    }).then((result) => {
                        if (result.value) {
                            window.location.reload();
                        }
                    })

                }
            })
    }

    return (
        <Box mt={5} pt={5} pb={5} pr={10} pl={10} shadow="md" borderWidth="1px" borderRadius={'3xl'}>
            <Box w={"Box"}>
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
                <HStack mt={10} mb={10}>
                    <Button colorScheme={"yellow"} onClick={()=>verDetalleGasto()} w={"full"}>Ver más</Button>
                    <Button colorScheme={"red"} onClick={()=>eliminarGasto()} w={"full"}>Eliminar</Button>
                </HStack>
            </Box>
        </Box>
    )
}

export default Card_Gasto