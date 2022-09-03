import axios from "axios"
import Swal from "sweetalert2"

const downloadFile = (archivo) => {
    axios.get(process.env.SERVIDOR + "/archivo/download/" + archivo._id, { responseType: 'blob' })
        .then(res => {
            const url = window.URL.createObjectURL(res.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute("download", archivo.nombre, archivo.tipo);
            document.body.appendChild(link);
            link.click();
        }).catch(err => {
            Swal.fire({
                title: 'Error',
                text: 'No se pudo descargar el archivo',
                type: 'error',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            })
        })
}
module.exports = downloadFile;