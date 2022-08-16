import axios from "axios"

const downloadFile = (archivo) => {
    axios.get(process.env.SERVIDOR + "/archivo/download/" + archivo._id, { responseType: 'blob' })
        .then(res => {
            console.log(archivo)
            const url = window.URL.createObjectURL(res.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute("download", archivo.nombre, archivo.tipo);
            document.body.appendChild(link);
            link.click();
        }).catch(err => {
            console.log("Error al descargar un archivo")
        })
}

export default downloadFile