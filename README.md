# CeeWebApp

Es un software dirigido a los CEES de la Universidad del Bío-Bío, el cual esta enfocado en ayudar a desarrollar parte de las actividades que se generan de forma habitual por parte de estos, 

## Software stack
El proyecto "CeeWebAPP" es una aplicación web que corre sobre el siguiente software:

- Ubuntu 18.04
- NodeJS 16.14.2
- NextJS 12.1.6
- ReactJS 18.1.0
- ExpressJS 4.17.1
- Mongoose 5.9.24
- MongoDB 4.5.0
- MongoAtlas

## Configuraciones de Ejecución para Entorno de Desarrollo/Produccción

~~Indicar instrucciones de como obtener una copia del proyecto para ejecutarlo localmente.~~

### Credenciales de Base de Datos y variables de ambiente
- Editar el archivo `src/env.php`
- **IMPORTANTE**: Por razones de Seguridad **NUNCA** debes guardar las credenciales y subirlas al repositorio


### ~~Docker, Máquina Virtual, Sistema Operativa~~
Con una terminal situarse dentro del directorio raiz donde fue clonado este repositorio, por ej: `~/git/mi-proyecto/`.
Una vez situado en la raiz del proyecto, dirigirse al directorio `docker` y ejecutar lo siguiente para construir la imagen docker:

```bash
docker build -t mi-proyecto:version1.0 .

```

Una vez construida la imagen, lanzar un contenedor montando un volumen que contenga el código del repositorio, en el directorio /var/www/html del contenedor.

```bash
docker run --rm -ti -p 80:80 -v /home/usuario/git/mi-proyecto/:/var/www/html mi-proyecto:version1.0 bash
```


Iniciar el servicio de Apache Http Server

```bash
service apache2 start
```

Iniciar el servicio de Nginx

```bash
service nginx start
```

Iniciar el servicio de NodeJS

```bash
nodejs index.js
```


### Instalar dependencias del proyecto

Cambiar al directorio web document root (Apache) del contenedor:
```bash
cd /var/www/html
```

Instalar las dependencias del proyecto con composer
```bash
composer install
```

Cambiar permisos para permitir la correcta ejecución de la aplicación en entorno local
```bash
chmod -R 777 web/assets/ logs/ cache/
```

Ir a un navegador web y ejecutar la siguiente url [mi-proyecto](http://localhost/mi-carpeta/index.php)

## Construido con

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




## Licencia

Este proyecto fue construido con la licencia , - ver [LICENSE.md](LICENSE.md) para mayor información


## Contribuir al Proyecto

- Por favor lea las instrucciones para contribuir al proyecto en [CONTRIBUTING.md](CONTRIBUTING.md)

## Agradecimientos

- Basado en el código de ejemplo de las paginas de documentación citadas previamente, foros de Stackoverflow, issues de Github issues, entre otro tipos de paginas que se utilizaron para recopilación de información y/o reconocimiento de errores.
