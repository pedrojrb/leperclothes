# Leper Clothes👕
Leper clothes es un proyecto que se basa en el desarrollo de una API REST la cual provee los datos de los remeras que comercializa el emprendimiento ficticio. La finalidad es poder desarrollar un proyecto personal en el cual aplique mis conocimientos y habilidades sobre las tecnologias que se implementan para el desarrollo.

---
## Alcance:

Desarrollar una API REST aplicando todos los metodos http.
Practica de diferentes conceptos de OOP y manejo de errores en Typescript.


---
## Tecnologias utilizadas:

- Postman v10.18.11
- Git v2.42.0
- MongoDBCompass v1.40.2
- Node JS v18.18.0
- Typescript v5.2.2

---
## Dependencias utilizadas:

- morgan v1.10.0
- express v4.18.2
- dotenv v16.3.1
- cors v2.8.5
- mongoose v7.5.3
- resend v2.0.0
- typescript v5.2.2
- JsonWebToken v9.0.2

---
## Dependencias de desarrollo utilizadas:
- @types/cors v28.14
- @types/express v4.17.18
- @types/morgan v1.9.6
- concurrently v8.2.1
- nodemon v3.0.1
- cryptr v6.3.0


## Como instalarla
<b>Requisitos:</b>
Tener instalado NodeJS version 18.18.0 o posterior.

Clonar este proyecto.
En la carpeta donde fue clonado el proyecto ejecutar el siguiente comando: <b>npm run start:dev</b>

# EndPoints

    URL: https://localhost:8001/api

### User Endpoints


| Método | EndPoint | Descripción |
|-----------|-----------|-----------|
| <p style="color:green">GET</p>   | /user/login    | Iniciar sesión   |
| <p style="color:green">GET</p>    | /user    | Obtener todos los usuarios    |
| <p style="color:green">GET</p>    | /user/search/username=?    | Buscar por nombre de usuario    |
| <p style="color:green">GET</p>   | /user/verify/token    | Verificacion de usuario    |
| <p style="color:yellow">POST</p>    | /user/login    | Enviar datos para inicio de sesión    |
| <p style="color:yellow">POST</p>    | user/create    | Crear usuario    |
| <p style="color:yellow">POST</p>   | /user/modify/id    | Modificar usuario    |
| <p style="color:yellow">POST</p>   | /user/verify/token | Enviar código para verificar usuario   |
| <p style="color:red">DELETE</p>  | /user/search/id   | Eliminar usuario |


### T-shirts EndPoints

| Método | EndPoint | Descripción |
|-----------|-----------|-----------|
| <p style="color:green">GET</p>   | /tshirts    | Obtener todas las remeras   |
| <p style="color:green">GET</p>    | /tshirts/search/name?    | Buscar remeras por nombre    |
| <p style="color:green">GET</p>    | /tshirts/search/id    | Filtrar remera por id    |
| <p style="color:yellow">POST</p>   | /tshirts/modify/id    | Modificar remera    |
| <p style="color:yellow">POST</p>    | /tshirts/create    | Crear remera    |
| <p style="color:red">DELETE</p>  | /tshirts/search/id  | Eliminar remera |