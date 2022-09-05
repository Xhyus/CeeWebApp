# **CeeWebApp**

Es un software dirigido a los CEES de la Universidad del Bío-Bío, el cual esta enfocado en ayudar a desarrollar parte de las actividades que se generan de forma habitual por parte de estos,

## **Software stack**
El proyecto "CeeWebApp" es una aplicación web que corre sobre el siguiente software:

- Ubuntu 18.04
- NodeJS 16.15.0
- NextJS 12.1.6
- ReactJS 18.1.0
- ExpressJS 4.17.1
- Mongoose 5.9.24
- MongoDB 4.5.0
- MongoAtlas

## **Configuraciones de Ejecución para Entorno de Desarrollo/Produccción**

### Conexion a la base de datos
Para obtener un string de conexion de atlas lo primero que se debe hacer es ir a la página de [MongoAtlas](https://account.mongodb.com/account/login), se registra y le pedira que ingrese un nombre y contraseña para una base de datos, crea la nueva base de datos y luego en el menú de la izquierda selecciona "Clusters" y luego "Connect" y selecciona "Connect your application" y copia el string de conexion. Este string de conexion debe ser para el que se entrega con la siguiente configuracion:
- NodeJS
- 2.2.12 or later

Con esto deberia entregarse un string de conexion tal que asi:
```
mongodb://tallerDesarrollo:<password>@tallerDesarrollo-shard-00-00.eziad.mongodb.net:27017,tallerDesarrollo-shard-00-01.eziad.mongodb.net:27017,tallerDesarrollo-shard-00-02.eziad.mongodb.net:27017/?ssl=true&replicaSet=atlas-li16kg-shard-0&authSource=admin&retryWrites=true&w=majority
```

Entre las etiquetas < > se debe reemplazar el password por el que se le entrega al crear la base de datos.

Este string de conexion debe ser reemplazado en el archivo .env que se encuentra en la raiz del proyecto, en la variable de entorno `DB`.

### Clonación del repositorio
- Para obtener una copia del proyecto se debe clonar el repositorio de GitHub, para esto se debe ejecutar el siguiente comando en la terminal:

**En caso de https:**
```bash
git clone https://github.com/Xhyus/CeeWebApp
```
**En caso de ssh:**
```bash
git clone git@github.com:Xhyus/CeeWebApp.git
```
### Variables de entorno
- Se debe generar un archivo .env en la carpeta frontend y backend respectivamente, el cual debe contener las siguientes variables de entorno:

**Backend:**
```.env
DB=MONGOATLASURL
PORT=3001
SECRET_TOKEN=SECRET_TOKEN
MAIL_IECI=MAIL_IECI
PASS_IECI=PASS_IECI
MAIL_ICO=MAIL_ICO
PASS_ICO=PASS_ICO
MAIL_ICINF=MAIL_ICINF
PASS_ICINF=PASS_ICINF
MAIL_CPA=MAIL_CPA
PASS_CPA=PASS_CPA
```
- Para la variable `DB`, se debe ingresar la URL de la base de datos de MongoAtlas, la cual se puede obtener en el siguiente link: https://www.mongodb.com/cloud/atlas
- Para la variable `SECRET_TOKEN`, se debe ingresar una cadena de caracteres que se utilizará para la encriptación de las contraseñas de los usuarios.
- Para las variables `MAIL_XXXX` y `PASS_XXXX`, se debe ingresar el correo y contraseña de los correos que se utilizarán para el envío de correos electrónicos, la contraseña corresponde a una que se obtiene siguiendo los pasos de la siguiente página: https://support.google.com/accounts/answer/185833?hl=es-419

**Frontend:**
```.env
SERVIDOR=http://localhost:3001/api
PORT=3000
SERVIDOR2=http://146.83.198.35:1124/api
```
- Para la variable `SERVIDOR`, se debe ingresar la URL del servidor de backend, en este caso se utiliza localhost:3001/api para el entorno de desarrollo y la URL del servidor de producción para el entorno de producción.

- **IMPORTANTE**: Por razones de Seguridad **NUNCA** debes guardar las credenciales y subirlas al repositorio


## Docker, Máquina Virtual, Sistema Operativo
Con una terminal situarse dentro del directorio raiz del proyecto.
Una vez situado en la raiz del proyecto y ejecutar lo siguiente para construir la imagen docker:


**Frontend:**

Para construir la imagen docker del frontend, se debe ejecutar el siguiente comando:
```bash
docker build -t ceewebappfront .
```

Una vez creado el contenedor de docker, se debe ejecutar el siguiente comando para correr el contenedor:


```bash
 docker run --rm -ti -p 80:3000 -v ${pwd}:/home ceewebappfrontend
```

Cambiar permisos para permitir la correcta ejecución de la aplicación en entorno local
```bash
chmod -R 777 home/
```

Una vez ejecutado el comando anterior, se debe ingresar a la carpeta Home, para esto debe ejecutar el comando:

```bash
 cd home/
```

**Backend:**

Para construir la imagen docker del backend, se debe ejecutar el siguiente comando:
```bash
docker build -t ceewebappbackend .
```

Una vez creado el contenedor de docker, se debe ejecutar el siguiente comando para correr el contenedor:


```bash
 docker run --rm -ti -p 3001:3001 -v ${pwd}:/home ceewebappbackend
```

Cambiar permisos para permitir la correcta ejecución de la aplicación en entorno local
```bash
chmod -R 777 home/
```

Una vez ejecutado el comando anterior, se debe ingresar a la carpeta Home, para esto debe ejecutar el comando:

```bash
 cd home/
```

### Instalar dependencias del proyecto

Para instalar las dependencias del proyecto,se debe ejecutar el siguiente comando en la terminal, esto se hace en ambos contenedores de docker, frontend y backend:

```bash
yarn install
```

Para poder ejecutar el proyecto se debe generar el .env en la carpeta frontend y backend respectivamente, el cual debe contener las variables mencionadas anteriormente. Para generar el .env mediante terminal se debe ejecutar el siguiente comando:

```bash
touch .env
```

Para modificar el archivo .env se debe ejecutar el siguiente comando:

```bash
nano .env
```

Para ejecutar el proyecto se debe ejecutar el siguiente comando en la terminal:

```bash
pm2 start yarn -- dev
```


Ir a un navegador web y ejecutar la siguiente url [CeeWebApp](https://localhost)

## **Credenciales de acceso**
| Correo electrónico | Contraseña | Tipo Usuario | Estado |
|--------------------|------------|--------------|--------------|
|pablo@comercial.cl| password|Alumno Comercial| Activo |
|ignacio@ieci.cl|password|Alumno IECI| Activo |
|alejandra@icinf.cl|password|Alumno ICINF| Activo |
|juan@cpa.cl|password|Alumno CPA| Activo |
|francisco@ieci.cl|password|Alumno CPA| Inactivo |

## **Construido con**

- [ReactJS](https://es.reactjs.org/) - Framework Javascript para manejo de logica funcional de Frontend
- [Next.JS](https://nextjs.org/) - Libreria de React para generación de proyectos Serverless y base del proyecto visual
- [Express](https://expressjs.com/es/) - Framework utilizado para creación de backend con API RESTFUL
- [Mongoose](https://mongoosejs.com/) - Gestor de base de datos no relacional MongoDB
- [Nodemailer](https://nodemailer.com/about/) - Libreria de envio de correos electronicos
- [Multer](https://www.npmjs.com/package/multer) - Libreria para gestionar subida de archivos en backend
- [Chakra](https://chakra-ui.com/) - Libreria de componentes visuales para frameworks
- [JWT-Simple](https://www.npmjs.com/package/jwt-simple) - Libreria generadora de tokens
- [moment](https://momentjs.com/) - Libreria de manejo de tiempos para tokens
- [Yarn](https://yarnpkg.com/) - Administrador de dependencias
- [dotenv](https://www.npmjs.com/package/dotenv) - Libreria de lectura de archivos .env
- [bcrypt](https://openbase.com/js/bcrypt/documentation) - Libreria para encriptar información
- [cors](https://www.npmjs.com/package/cors) - Libreria de control de acceso
- [MongoDB](https://www.mongodb.com/) - Base de datos no relacional
- [Axios](https://axios-http.com/docs/intro) - Libreria de consultas con protocolo http y https
- [date-fns](https://date-fns.org/) - Comparador de fechas de javascript
- [fs](https://nodejs.org/api/fs.html) - Administrador de archivos en sistema para NodeJS
- [React-Icons](https://react-icons.github.io/react-icons/) - Libreria de iconos como componentes de React
- [Rutlib](https://www.npmjs.com/package/rutlib) - Libreria validadora de RUTs Chilenos
- [Sweetalert2](https://sweetalert2.github.io/) - Libreria de alertas
- [Nodemon](https://nodemon.io/) - Monitoreador de cambios
- [Github](https://github.com) - Almacenador de control de versiones
- [Git](https://github.com) - Sistema de control de versiones

## **Contribuidores del proyecto**

- Integrante: Ignacio González - [Correo Electrónico](ignacio.gonzalez1901@alumnos.ubiobio.cl)
- Integrante: Pablo Montoya - [Correo Electrónico](pablo.montoya1801@alumnos.ubiobio.cl)

## **Agradecimientos**

- Basado en el código de ejemplo de las paginas de documentación citadas previamente, foros de Stackoverflow, issues de Github issues, entre otro tipos de paginas que se utilizaron para recopilación de información y/o reconocimiento de errores.
