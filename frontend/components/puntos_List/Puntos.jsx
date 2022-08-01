import React from 'react'
import handleUpperCase from '../../utils/handleUpperCase'

const puntos = ({ puntos }) => {
    return (
        <ul>
            {puntos.map((punto, key) => {
                return (
                    <div key={key}>
                        <p>{key + 1}: {handleUpperCase(punto.asunto)}</p>
                    </div>
                )
            })}
        </ul>
    )
}

export default puntos