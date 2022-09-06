import * as yup from "yup";

const validacion = yup.object({
    ubicacion: yup.string()
        .min(2, "La ubicacion debe contener al menos 2 caracteres")
        .max(50, "La ubicacion debe contener como maximo 50 caracteres")
        .matches(/^[a-zA-Z0-9\s\.\,\#\(\)\[\]\{\}]{3,}$/, "El nombre solo debe contener letras, espacios, numeros y algunos caracteres")
        .required("La ubicación es obligatoria"),
    asunto: yup.string()
        .min(10, "El asunto debe contener al menos 10 caracteres")
        .max(100, "El asunto debe contener como maximo 100 caracteres")
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-]+$/, "El asunto solo debe contener letras, espacios, numeros y algunos caracteres")
        .required("El asunto es obligatorio"),
    contexto: yup.string()
        .min(10, "El contexto debe contener al menos 10 caracteres")
        .max(800, "El contexto debe contener como maximo 800 caracteres")
        .matches(/^[a-zA-Z0-9\s\.\,\;\:\!\?\¿\¡\(\)\[\]\{\}]{3,}$/, "El contexto solo debe contener letras, espacios, numeros y algunos caracteres")
        .required("El contexto es obligatorio"),
    fecha: yup.date().min(new Date(), "La fecha debe ser mayor a la fecha actual").required("La fecha es obligatoria"),
    tipoAsamblea: yup.string()
        .required("El tipo de asamblea es obligatorio"),
    url: yup.string()
        .matches(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, "La url no es valida"),
})

export default validacion