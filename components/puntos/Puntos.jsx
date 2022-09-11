import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { FormControl, FormLabel, Input, HStack, Tooltip } from '@chakra-ui/react'


const Puntos = ({ handleChangePunto, id, handleDeletePunto, ultimo }) => {

    const handleDelete = () => {
        if (id + 1 === ultimo && id !== 0) {
            return (
                <FaTrash onClick={() => handleDeletePunto(id)} />
            )
        }
        if (id !== ultimo) {
            return null
        }
    }

    return (
        <>
            <FormControl >
                <FormLabel htmlFor={id}>Punto a tratar: {id + 1}</FormLabel>
                <HStack mb={5}>
                    <Tooltip label="Temas importantes a conversar" color={"white"} aria-label="Temas importantes a conversar">
                        <Input maxLength={250} minLength={10} type="text" name={id} placeholder="Punto a tratar" onChange={handleChangePunto} />
                    </Tooltip>
                    {handleDelete()}
                </HStack>
            </FormControl>
        </>
    )
}

export default Puntos