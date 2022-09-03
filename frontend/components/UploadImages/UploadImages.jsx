import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

const UploadImages = () => {
    const pid = localStorage.getItem("pid")
    console.log(pid)
    return (
        Swal.fire({
            title: 'Adjuntar archivos',
            html: '<Input type="file" id="file" multiple>',
            showCancelButton: true,
            confirmButtonText: 'Subir',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const file = document.getElementById('file').files
                const formData = new FormData()
                for (let i = 0; i < file.length; i++) {
                    formData.append('archivos', file[i])
                }
                axios.post(process.env.SERVIDOR + '/archivos/' + pid + '/' + localStorage.getItem('carrera') + '/asamblea', formData)
                    .then(res => {
                        Swal.fire({
                            title: 'Archivos adjuntados',
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                localStorage.removeItem('pid')
                                window.location.reload()
                            }
                            localStorage.removeItem('pid')
                        })
                    })
                    .catch(err => {
                        localStorage.removeItem('pid')
                        Swal.fire({
                            title: 'Error al adjuntar archivos',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                        })
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }))
}

export default UploadImages