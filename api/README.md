<a name="documentacion-de-la-api-trami-imagenes"></a>

# 📄 Documentación de la API Trami-Tickets

La API Trami-Imagenes es un servicio RESTful que proporciona acceso a las funcionalidades principales de la aplicación para Trami-imagenes sobre la creación de imágenes de forma dinámica. 🎫

<a name="indice"></a>

## 📌 Índice

- [📄 Documentación de la API Panel-Ficheros](#documentacion-de-la-api-trami-imagenes)
  - [📌 Índice](#índice)
  - [🔧 Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
  - [🚀 Endpoints](#endpoints)
    - [🕵️‍♂️ Imagen](#🕵️‍♂️-image)
      - [GET Imagen](#get-image)
    - [💼 Upload](#💼-uploads)
      - [POST Bg](#post-uploads-bg)
      - [GET Bg](#get-uploads-bg)
      - [POST Config](#post-uploads-config)
      - [GET Config](#get-uploads-config)
    - [📂 Usuario](#📂-departamentos)
      - [POST Login](#post-login)
  - [🔧 Despliegue de la Interfaz de Usuario de Angular](#despliegue-angular)

<a name="configuracion-de-variables-de-entorno"></a>

## 🔧 Configuración de Variables de Entorno

Antes de comenzar a usar esta API, asegúrese de tener correctamente configuradas las variables de entorno. Las variables de entorno están almacenadas en el archivo `.envExample`.

Debe cambiar el nombre del archivo `.envExample` a `.env` y completar las variables con sus respectivos valores.

Aquí está la lista de las variables de entorno requeridas:

```bash
PORT= # El puerto en el que se ejecutará la API sino se especifica se ejecutara en el puerto 2727
MONGO_URI= # La cadena de conexión a su base de datos MongoDB
JWT_SECRET= # La clave secreta utilizada para firmar los tokens JWT y verificar su autenticidad
ADMIN_ID= # ID del administrador 
SECRET_KEY_INTERNAL= # Clave para cifrar id internos de la api
SLACK_REDIRECT_URI= # Redirecion donde se enviara el codigo al registrar los departamentos a slack y debe coincidir con la redireccion en la Aplicacion de slack EJEMPLO: https://tuhost.com/api/slack/oauth
SLACK_CLIENT_ID= # Id del cliente de la aplicacion de slack donde se registraran los departamentos para dar permisos
SLACK_CLIENT_SECRET= # Secret del cliente de la aplicacion de slack donde se registraran los departamentos para dar permisos
TICKET_URL= # URL que se usará para construir la URL completa de los detalles de un ticket para enviar notificaciones a los usuarios. (Ej.: http://localhost:8080/ticket-details/, se debe mantener /ticket-details/ y se puede reemplazar http://localhost:8080)
```


<a name="despliegue-angular"></a>

## 🔧 Instrucciones para Desplegar la Interfaz de Usuario de Angular

1. Genera el Build de Angular ejecutando el siguiente comando en la carpeta de tu proyecto Angular:

    ``ng build``

2. Una vez generado el build, encontrarás una carpeta llamada `dist` dentro de tu proyecto Angular.

3. Copia el contenido de la carpeta `dist` y pégalo en la carpeta `public` de tu proyecto de la API. Esto permitirá que la interfaz de usuario esté disponible para ser servida por la API.

4. Asegúrate de que las rutas en tu interfaz de usuario Angular estén configuradas para funcionar con rutas relativas. No es necesario incluir el nombre de dominio completo en las rutas.

5. Para acceder a la interfaz de usuario, abre tu navegador y visita la dirección donde se está ejecutando tu API. La ruta principal será la raíz, es decir, `/`. Por ejemplo, si estás ejecutando tu API en `localhost:8080`, podrás acceder a la interfaz de usuario en `http://localhost:8080/`. Para usar la ruta `/auth/login` del proyecto de Angular, deberás apuntar a `http://localhost:8080/auth/login`

¡Listo! Siguiendo estos pasos, podrás desplegar y acceder a la interfaz de usuario Angular en conjunto con tu API de manera exitosa.