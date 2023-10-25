<a name="documentacion-de-la-api-trami-imagenes-pdf"></a>

# 📄 Documentación de la API Trami-Imagenes-PDF

La API Trami-Imagenes-PDF es un servicio RESTful que proporciona acceso a las funcionalidades principales de la aplicación para Trami-Imagenes-PDF sobre la creación de imágenes y PDF de forma dinámica. 🎫

<a name="indice"></a>

## 📌 Índice

- [📄 Documentación de la API Panel-Ficheros](#documentacion-de-la-api-trami-imagenes-pdf)
  - [📌 Índice](#índice)
  - [🔧 Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
  - [🚀 Endpoints](#endpoints)
    - [📷 Imagen](#image)
      - [GET Imagen](#get-image)
    - [📰 PDF](#pdf)
      - [GET PDF](#get-pdf)
      - [GET Data-fake](#get-data-fake)
    - [📂 Upload](#upload)
      - [POST Bg](#post-uploads-bg)
      - [GET Bg](#get-uploads-bg)
      - [DELETE Bg](#delete-uploads-bg)
      - [POST Config](#post-uploads-config)
      - [GET Config](#get-uploads-config)
      - [DELETE Config](#delete-uploads-config)
      - [POST Template](#post-uploads-template)
      - [GET Template](#get-uploads-template)
      - [DELETE Template](#delete-uploads-template)
    - [👤 Usuario](#usuario)
      - [POST Login](#post-login)
  - [🔧 Despliegue de la Interfaz de Usuario de Angular](#despliegue-angular)

<a name="configuracion-de-variables-de-entorno"></a>

## 🔧 Configuración de Variables de Entorno

Antes de comenzar a usar esta API, asegúrese de tener correctamente configuradas las variables de entorno. Las variables de entorno están almacenadas en el archivo `.env.example`.

Debe cambiar el nombre del archivo `.env.example` a `.env` y completar las variables con sus respectivos valores.

Aquí está la lista de las variables de entorno requeridas:

```bash
PORT= # El puerto en el que se ejecutará la API sino se especifica se ejecutara en el puerto 8080.
MONGO_URI= # La cadena de conexión a su base de datos MongoDB.
PATH_STORAGE_FILES= # La carpeta de almacenamiento para imagenes, archivos de configuración y templates. Para el correcto funcionamiento la misma debe existir y contener dentro una carpeta image, una json y otra template.
AUTH_USER=  # Usuario de administrador. Necesario para iniciar sesión en la aplicación.
AUTH_PASSWORD= # Contraseña de administrador. Necesario para iniciar sesión en la aplicación.
SECRET_KEY= # Secret key para generar token de autenticación.
API_DATA_URL= # Url para solicitar data para la creación de los PDF. Se debe incluir todo el url, menos los IDs que solicitarán la información, los mismos se agregan de forma dinámica en el servicio de generación de PDF.
HTMLTOCSSIMAGE_USER_ID= #User ID de HCTI API
HTMLTOCSSIMAGE_API_KEY= #Api key de HCTI API
```

<a name="endpoints"></a>

## 🚀 Endpoints

Para la mayoría de peticiones a la API, es esencial incluir un `Bearer Token` en los encabezados de autenticación. Los únicos endpoints que no solicitan el token de autenticación son los endpoint de LOGIN, GET IMAGEN y GET PDF.

<a name="image"></a>

### 📷 Images

 **/imagen**

<a name="get-image"></a>

#### **GET** `/imagen/:tipo/:text1/:text2/img.jpg`

**Descripción**: Genera la imagen a través de un tipo de configuración, y dos textos.

**Parámetros**:
- `tipo`: ID de la configuración precargada que se utlizará para generar la imagen. La imagen de fondo se halla en este archivo de configuración.
- `text1`: Primer texto para la imagen.
- `text2`: Segundo texto para la imagen.

**NOTA**: los textos no deben tener etiquetas HTML ni '/' porque sino la solicitud puede fallar. El servicio reemplazará las etiquetas HTML por strings vacíos. Pero los '/' harán que la ruta de generación de imagen falle. Para poder utilizar caracteres especiales, tomamos en cuenta los siguientes: 
- Los guiones "-" se reemplazarán por barras diagonales "/".
- Los signos "+" se reemplazarán por puntos ".".
- Los caracteres "%0A" se reemplazarán por saltos de línea.

**Respuesta**:
- Si la solicitud es correcta, se devolvera una imagen. 

<a name="pdf"></a>

### 📰 PDF

 **/pdf**

<a name="get-pdf"></a>

#### **GET** `/pdf/:tipo/:id/doc.pdf`

**Descripción**: Genera el PDF a través de un tipo de template y un ID para obtener la información que se usará para la generación del PDF.

**Parámetros**:
- `tipo`: ID del tipo de template que se utilizará para la generación del PDF.
- `id`: ID para obtener la información que necesitará el template para generar el PDF.

**Respuesta**:
- Si la solicitud es correcta, se devolvera un PDF.

<a name="get-data-fake"></a>

#### **GET** `/pdf/data-fake/:idTipo/:id`

**Descripción**: Retorna un objeto con información para generar un PDF ficticio.

**Parámetros**:
- `idTipo`: ID del tipo de template que se utilizará para la generación del PDF.
- `id`: ID para obtener la información que necesitará el template para generar el PDF.

**Respuesta**:
- Si la solicitud es correcta, se devolverá un objeto. 

<a name="upload"></a>

### 📂 Uploads

 **/api/uploads**

<a name="post-uploads-bg"></a>

#### **POST** `/api/uploads/bg`

**Descripción**: Permite subir una imagen de fondo para la generación de imágenes.

**Autorización**: 
- Es necesario que el solicitante sea un administrador para poder realizar esta acción.

**Cuerpo de la petición (Request Body)**:
- `foto`: Archivo de imagen en formato jpeg o png.
- `descripcion`:  Descripción para la imagen que servirá de referencia.

**Respuesta**:
- Si la autenticación es exitosa, se devuelve un mensaje de solicitud exitosa.

<a name="get-uploads-bg"></a>

#### **GET** `/api/uploads/bg`

**Descripción**: Obtiene una lista de imagenes de fondo disponibles para la creación de configuraciones.

**Autorización**: 
- Es necesario que el solicitante sea un administrador para poder acceder a esta información.

**Respuesta**:
- Se devuelve una lista de imágenes de fondo.

<a name="delete-uploads-bg"></a>

#### **DELETE** `/api/uploads/bg/:id`

**Descripción**: Permite a un administrador eliminar una imagen de fondo específica basada en su ID. Se cambiará el atributo de la imagen de `isDeleted` a true.

**Autorización**: 
- Es necesario que el solicitante sea un administrador para poder eliminar una imagen.

**Parámetros**:
- `id`: ID de la imagen que se desea eliminar.

**Respuesta**:
- Si la eliminación es exitosa, se devuelve un status code 204 y un mensaje.
- Si ocurre un error, se devuelve un mensaje de error.

<a name="post-uploads-config"></a>

#### **POST** `/api/uploads/json`

**Descripción**: Permite subir un archivo de configuración JSON.

**Autorización**: 
- Es necesario que el solicitante sea un administrador para poder realizar esta acción.

**Cuerpo de la petición (Request Body)**:
- `config`: Archivo JSON que contendrá la configuración CSS y el path de la imagen de fondo para la generación de imágenes.
- `nombre`:  Nombre para el archivo que servirá de referencia.

**Respuesta**:
- Si la autenticación es exitosa, se devuelve un mensaje de solicitud exitosa.

<a name="get-uploads-config"></a>

#### **GET** `/api/uploads/json`

**Descripción**: Obtiene una lista de configuraciones disponibles para la generación de imágenes.

**Autorización**: 
- Es necesario que el solicitante sea un administrador para poder acceder a esta información.

**Respuesta**:
- Se devuelve una lista de configuraciones.

<a name="delete-uploads-config"></a>

#### **DELETE** `/api/uploads/json/:id`

**Descripción**: Permite a un administrador eliminar una configuración específica basada en su ID. Se cambiará el atributo de la configuración de `isDeleted` a true.

**Autorización**: 
- Es necesario que el solicitante sea un administrador para poder eliminar una configuración.

**Parámetros**:
- `id`: ID de la configuración que se desea eliminar.

**Respuesta**:
- Si la eliminación es exitosa, se devuelve un status code 204 y un mensaje.
- Si ocurre un error, se devuelve un mensaje de error.

 **/api/uploads/template**

<a name="post-uploads-template"></a>

#### **POST** `/api/uploads/template`

**Descripción**: Permite subir un archivo en formato EJS.

**Autorización**: 
- Es necesario que el solicitante sea un administrador para poder realizar esta acción.

**Cuerpo de la petición (Request Body)**:
- `template`: Archivo EJS que se utilizará como template para generar un PDF.
- `nombre`:  Nombre para el archivo que servirá de referencia.

**Respuesta**:
- Si la autenticación es exitosa, se devuelve un mensaje de solicitud exitosa.

<a name="get-uploads-template"></a>

#### **GET** `/api/uploads/template`

**Descripción**: Obtiene una lista de templates disponibles para la generación de PDF.

**Autorización**: 
- Es necesario que el solicitante sea un administrador para poder acceder a esta información.

**Respuesta**:
- Se devuelve una lista de templates.

<a name="delete-uploads-template"></a>

#### **DELETE** `/api/uploads/template/:id`

**Descripción**: Permite a un administrador eliminar un template específico basado en su ID. Se cambiará el atributo del template de `isDeleted` a true.

**Autorización**: 
- Es necesario que el solicitante sea un administrador para poder eliminar un template.

**Parámetros**:
- `id`: ID del template que se desea eliminar.

**Respuesta**:
- Si la eliminación es exitosa, se devuelve un status code 204 y un mensaje.
- Si ocurre un error, se devuelve un mensaje de error.


<a name="usuario"></a>

### 👤 Usuarios

 **/api/usuario**

<a name="post-login"></a>

#### **POST** `/api/usuario/login`

**Descripción**: Permite a un administrador iniciar sesión utilizando usuario y contraseña.

**Cuerpo de la petición (Request Body)**:
- `username`: Usuario del administrador.
- `password`:  Contraseña del administrador.

**Respuesta**:
- Si la autenticación es exitosa, se devuelve un objeto con el `token` de acceso que contiene información del usuario.

**Ejemplo de Respuesta**:
```json
{
  "message": "token_jwt_aquí",
}
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