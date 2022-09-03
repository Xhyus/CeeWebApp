import React from 'react'
import downloadFile from '../../data/asambleas/downloadFile'

const FileList = (archivos) => {
    if (archivos.length > 0) {
        archivos.map(archivo => {
            return (
                <li key={archivo.id}>
                    <a onClick={() => downloadFile(archivo)} download>{archivo.nombre}</a>
                </li>
            )
        })
    } else {
        return (
            <li>
                <p>No hay archivos</p>
            </li>
        )
    }
}

export default FileList