# **CeeWebApp**

Es un software dirigido a los CCEE de la Universidad del Bío-Bío, el cual esta enfocado en ayudar a desarrollar parte de las actividades que se generan de forma habitual por parte de estos.

## **Tabla de contenidos**
1. [Software Stack](#software-stack)
2. [Conexión a la base de datos](#conexión-a-la-base-de-datos)
3. [Importar base de datos](#importar-base-de-datos)
4. [Clonación del repositorio](#clonación-del-repositorio)
5. [Variables de entorno](#variables-de-entorno)
6. [Entorno de desarrollo (Docker)](#docker)
7. [Instalar dependencias del proyecto ambiente de desarrollo](#instalar-dependencias-del-proyecto-ambiente-de-desarrollo)
9. [Entorno de producción (Servidor)](#servidor-de-producción)
8. [Instalar dependencias del proyecto ambiente de producción](#instalar-dependencias-del-proyecto-ambiente-de-producción)
10. [Credenciales de acceso](#credenciales-de-acceso)
11. [Construido con](#construido-con)
12. [Contribuidores del proyecto](#contribuidores-del-proyecto)
13. [Agradecimientos](#agradecimientos)


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
- Yarn
- NPM
## **Configuraciones de Ejecución para Entorno de Desarrollo y Produccción**

### Conexión a la base de datos
Para obtener un string de conexion de atlas lo primero que se debe hacer es ir a la página de [MongoAtlas](https://account.mongodb.com/account/login), se registra y le pedirá que ingrese un nombre y contraseña para una base de datos. Crea la nueva base de datos y luego en el menú de la izquierda selecciona "Clusters" y luego "Connect" y selecciona "Connect your application" y copia el string de conexion. Este string de conexion debe ser para el que se entrega con la siguiente configuracion:
- NodeJS
- 2.2.12 or later

Con esto deberia entregarse un string de conexion tal que asi:
```
mongodb://tallerDesarrollo:<password>@tallerDesarrollo-shard-00-00.eziad.mongodb.net:27017,tallerDesarrollo-shard-00-01.eziad.mongodb.net:27017,tallerDesarrollo-shard-00-02.eziad.mongodb.net:27017/?ssl=true&replicaSet=atlas-li16kg-shard-0&authSource=admin&retryWrites=true&w=majority
```

Entre las etiquetas < > se debe reemplazar el password por el que se le entrega al crear la base de datos.

Este string de conexion debe ser reemplazado en el archivo .env que se encuentra en la raiz del proyecto, en la variable de entorno `DB`.

### Importar base de datos

Para importar la base de datos a nuestro directorio local es necesario utilizar el software [MongoDB Compass](https://www.mongodb.com/try/download/compass) con el que realizaremos la importación de los archivos .json de la base de datos.

**Los pasos a seguir son:**
```bash
Seleccionar la opción "Create database" donde ingresaremos el nombre de la base de datos junto con el de la colección.
Seleccionar la base de datos creada.
Seleccionar la colección creada.
Pulsar el botón "ADD DATA" y luego seleccionar la opcion "Import File"
Agregar los archivos uno por uno dentro de la carpeta raíz del proyecto /backend/colecciones_bd
```

### **Clonación del repositorio**
Para obtener una copia del proyecto se debe clonar el repositorio de GitHub, para esto se debe ejecutar el siguiente comando en la terminal:

```bash
git clone -b [branch] https://github.com/Xhyus/CeeWebApp
```

Si se desea clonar el backend del proyecto se debe reemplazar `[branch]` por `backendProd` y si se desea clonar el frontend del proyecto se debe reemplazar `[branch]` por `frontendProd`. Si quieres se desea clonar el proyecto completo se debe reemplazar `[branch]` por `main`.

### **Variables de entorno**
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
SERVIDOR=IP_SERVIDOR
PORT=3000
```
- Para la variable `SERVIDOR`, se debe ingresar la URL del servidor de backend, para producción se debe ingresar la IP: `http://146.83.198.35:1124/api`. Para desarrollo se debe ingresar la IP del servidor de desarrollo.

## Docker
Con una terminal situarse dentro del directorio raiz del proyecto, para esto se debe estar en el mismo directorio donde se hizo el clon del proyecto (branch main) y ejecutar el siguiente comando:
```bash
cd ceewebapp
```

**Frontend:**

Para construir la imagen docker del frontend, se debe ejecutar el siguiente comando desde la carpeta raiz del proyecto:

```bash
cd frontend
docker build -t ceewebappfront .
```

Una vez creado el contenedor de docker, se debe ejecutar el siguiente comando para correr el contenedor:


```bash
 docker run --rm -ti -p 80:3000 -v ${pwd}:/home ceewebappfront
```

- pwd: es la ruta del directorio raiz del frontend, asi que es importante ejecutar el comando desde la carpeta ceewebapp/ como se especifica.


**Backend:**

Para construir la imagen docker del backend, se debe ejecutar el siguiente comando desde la carpeta raiz del proyecto:

```bash
cd backend
docker build -t ceewebappback .
```

Una vez creado el contenedor de docker, se debe ejecutar el siguiente comando para correr el contenedor:


```bash
 docker run --rm -ti -p 80:3001 -v ${pwd}:/home ceewebappback
```

- pwd: es la ruta del directorio raiz del backend, asi que es importante ejecutar el comando desde la carpeta ceewebapp/backend como se especifica.

 Luego se debe acceder a la carpeta del proyecto, para esto se debe ejecutar el siguiente comando:
```bash
cd Ceewebapp
```

### **Instalar dependencias del proyecto ambiente de desarrollo**

Para instalar las dependencias del proyecto, se debe ejecutar el siguiente comando en la terminal, esto se hace en ambos contenedores de docker, frontend y backend:

Para el correcto funcionamiento del proyecto se deben dar permisos de administrador a la carpeta, para esto se ejecuta el siguiente comando dentro de la carpeta raiz del proyecto:
```bash
chmod -R 777 .
```

**Frontend:**

Si se encuentra en la carpeta raiz del proyecto y desea instalar las dependencias del frontend, se debe ejecutar el siguiente comando:

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
yarn run dev
```


**Backend:**

Si se encuentra en la carpeta raiz del proyecto y desea instalar las dependencias del backend, se debe ejecutar el siguiente comando:

```bash
yarn install
```

Para poder ejecutar el proyecto se debe generar el .env en la carpeta backend, el cual debe contener las variables mencionadas anteriormente. Para generar el .env mediante terminal se debe ejecutar el siguiente comando:

```bash
touch .env
```

Para modificar el archivo .env se debe ejecutar el siguiente comando:

```bash
nano .env
```

Para ejecutar el proyecto se debe ejecutar el siguiente comando en la terminal:

```bash
yarn run dev
```


## **Servidor de producción**
Es importante considerar que para el funcionamiento correcto del proyecto deben estar corriendo los proyectos en diferentes servidores donde deberan realizarse los pasos de instalación de dependencias y configuración de variables de entorno.

Para configurar el servidor de producción se debe seguir los siguientes pasos en ambos servidores, frontend y backend:


Iniciar el modo root e ingresar las credenciales de administrador del servidor
```bash
sudo su
```

Actualizar el sistema operativo
```bash
apt-get update
```

Instalar curl para descargar paquetes
```bash
apt-get install -y curl
```

Instalar autoclean para limpiar el sistema
```bash
apt-get -y autoclean
```

Instalar git para clonar el repositorio
```bash
apt-get install git
```

Instalar nano para editar archivos
```bash
apt-get install nano
```

Instalar nvm para instalar NodeJS
```bash
curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
```
Reiniciar bash para que se puedan utilizar comandos de NVM

```bash
exec bash
```

Instalar version 16.15.0 de NodeJS
```bash
nvm install 16.15.0
```
Cambiar alias de NodeJS
```bash
nvm alias default 16.15.0
```
Cambiar la version de NodeJS
```bash
nvm use default
```

Instalar yarn para instalar dependencias y pm2 para correr la aplicación
```bash
npm install -g yarn
npm install -g pm2
```

Clonar el repositorio del proyecto como se menciona en el apartado "Clonación del repositorio"


Luego de haber clonado el repositorio se debe mover hacia la carpeta raiz del proyecto, para esto se debe ejecutar el siguiente comando:

```bash
cd Ceewebapp
```

### **Instalar dependencias del proyecto ambiente de producción**

Si se encuentra en la carpeta raiz del proyecto y desea instalar las dependencias, se debe ejecutar el siguiente comando:

```bash
yarn install
```

Para poder ejecutar el proyecto se debe generar el .env en la carpeta raiz del proyecto, el cual debe contener las variables mencionadas anteriormente dependiendo de cual de los proyectos este corriendo, el frontend o el backend. Para generar el .env mediante terminal se debe ejecutar el siguiente comando:

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

Para visualizar el frontend se debe dirigir a la siguiente ruta:

```bash
http://localhost:3000
```

## **Credenciales de acceso**
| Correo electrónico | Contraseña | Tipo Usuario | Estado |
|--------------------|------------|--------------|--------------|
|pmontoya@gmail.com| password|Alumno Cpa| Activo |
|igonzalez@gmail.com|password|Alumno IECI| Activo |
|asegura@gmail.com|password|Alumno ICINF| Activo |

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
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) - Administrador de base de datos
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
