# trami-imagenes APP

# Índice

1. [Introducción](#introduccion)
2. [Funcionalidades](#funcionalidades)
3. [Rutas de la aplicación](#rutas)
4. [Tecnologías utilizadas](#tecnologias)
5. [Scripts disponibles](#scripts-disponibles)

<a name="introduccion"></a>

## 1. Introducción

Bienvenido a Trami Imagenes, una aplicación para generar imagenes de forma dinámica. Aquí encontrarás una guía rápida para instalar, configurar y utilizar la aplicación.

La configuración básica se encuentra en el archivo `package.json`. Asegúrate de revisar los scripts y las dependencias antes de ejecutar comandos.

<a name="funcionalidades"></a>

## 2. Funcionalidades

### Iniciar sesión

La función de inicio de sesión permite a los usuarios autenticarse en la aplicación para acceder a sus funcionalidades. Los usuarios deben proporcionar sus credenciales para iniciar sesión. Las características clave de esta funcionalidad incluyen:

- Iniciar Sesión: Los usuarios pueden acceder a la página de inicio de sesión a través de la ruta /auth/login. La página de inicio de sesión proporciona un formulario donde los usuarios ingresan su nombre de usuario y contraseña. Una vez autenticados, tienen acceso a las demás funcionalidades de la aplicación. 

**NOTA**: Recuerda configurar tu usuario y contraseña en la API.

### Generador de Imágenes
El generador de imágenes es una funcionalidad central de la aplicación que permite a los usuarios crear imágenes dinámicas utilizando configuraciones predefinidas o personalizadas. Las características clave incluyen:

- Generar Imágenes: Los usuarios pueden crear imágenes mediante la selección de configuraciones y la entrada de texto. La misma se encuentra en una URL que se muestra a través de SweetAlert.

- Configuraciones Personalizadas: Los usuarios pueden personalizar las configuraciones CSS para los elementos de texto en la imagen.

- Vista Previa de la Imagen: Se proporciona una vista previa de la imagen generada con las configuraciones seleccionadas.

- Eliminar Configuraciones: Los usuarios pueden eliminar configuraciones personalizadas que ya no necesiten.

### Administrador de Imágenes
El administrador de imágenes permite a los usuarios cargar imágenes de fondo, agregar descripciones y administrar las imágenes existentes. Las características clave incluyen:

- Subir Imágenes: Los usuarios pueden cargar imágenes de fondo y agregar descripciones relacionadas con esas imágenes.

- Eliminar Imágenes: Los usuarios pueden eliminar imágenes previamente cargadas si ya no son necesarias.

### Subida de Configuración
La subida de configuración es una funcionalidad que permite a los usuarios generar archivos JSON con la configuración CSS de los textos que se utilizarán para la creación de imágenes. Las características clave incluyen:

- Generar Archivos JSON: Los usuarios pueden crear archivos JSON que contienen la configuración CSS de los textos.

- Vista Previa de la Configuración: Los usuarios pueden ver una vista previa de la configuración CSS y cómo afectará a la generación de imágenes.

- Datos del Archivo JSON: Se muestran los datos del archivo JSON resultante para su revisión.

Estas son las funcionalidades adicionales que se han agregado a la documentación. Si hay más funcionalidades específicas que desees documentar o detalles adicionales que desees agregar, no dudes en proporcionar más información, y estaré encantado de incluirla en la documentación.

**NOTA**: En los textos que generan imágenes, no se pueden utilizar etiquetas HTML. Además, ciertos caracteres especiales tienen reemplazos específicos:

- Los guiones "-" se reemplazarán por barras diagonales "/".
- Los signos "+" se reemplazarán por puntos ".".
- Los caracteres "%0A" se reemplazarán por saltos de línea.

<a name="rutas"></a>

## 3. Rutas de la aplicación

A continuación se describen las rutas disponibles en la aplicación:

- **Iniciar Sesión**: `/auth/login`
  - Descripción: Página de inicio de sesión para acceder a la aplicación.
  
- **Generador de imágenes/Administrador de configuraciones**: `/dashboard/home`
  - Descripción: Página principal que actúa como generador de imágenes. También permite eliminar configuraciones.
  - Requisitos: Requiere autenticación.

- **Subida de imagen/Administrador de imágenes**: `/dashboard/upload`
  - Descripción: Página que permite a los usuarios cargar imágenes y agregar descripciones. También permite eliminar imágenes.
  - Requisitos: Requiere autenticación.

- **Subida de configuración**: `/dashboard/config`
  - Descripción: Página donde se generarán los archivos JSON con la configuración CSS de los textos que se utilizarán para la creación de la imagen. Se dispondrá de una vista previa de la imagen y su configuración CSS, como así también se verán los datos del archivo JSON.
  - Requisitos: Requiere autenticación.

- **Ruta por Defecto**: `/**`
  - Descripción: Ruta por defecto en caso de que ninguna coincida, redirige a la Página principal.

<a name="tecnologias"></a>

## 4. Tecnologías utilizadas

Las tecnologías utilizadas en el front-end de Trami-Imagenes son las siguientes:

- **Angular**: Angular es un framework de desarrollo de aplicaciones web de código abierto basado en TypeScript. Proporciona una estructura robusta para construir aplicaciones web modernas y dinámicas.
- **Bootstrap**: Bootstrap es un framework de diseño CSS ampliamente utilizado que ofrece una amplia variedad de componentes y estilos predefinidos. Facilita la creación de interfaces de usuario atractivas y responsivas.
- **SweetAlert2**: SweetAlert2 es una biblioteca que permite mostrar alertas y modales personalizables en tu aplicación. Ofrece una experiencia de usuario más interactiva y atractiva al mostrar información importante.
- **ngx-pagination**: ngx-pagination es una biblioteca para Angular que agrega capacidades de paginación a las listas y tablas en tu aplicación. Esto permite una mejor navegación y organización de los datos.
- **TypeScript**: Es un lenguaje de programación que amplía las capacidades de JavaScript al agregar características de tipos estáticos y otros elementos de programación orientada a objetos.
- **Zone.js**: Es una biblioteca que proporciona detección y reacción a cambios asincrónicos en aplicaciones Angular.

<a name="scripts-disponibles"></a>

## 5. Scripts disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

- `npm start`: Inicia la aplicación en un entorno de desarrollo.

- `npm run build`: Compila y genera los archivos estáticos para producción. Importante para utilizar el front desde el back, la carpeta dist generada por el comando será la que se utilice para servir el contenido desde la api.

Cuando ejecutes este comando, no te olvides de reemplazar el environment por el userid que utilizará el administrador y reemplazar la URL de la api.

- `npm run envs`: Este script de Node.js es utilizado para configurar las variables de entorno en una aplicación Angular mediante la generación de un archivo environments.ts en el directorio src/environments. Este archivo contiene las variables de entorno necesarias para la aplicación Angular, como la URL de la API. Sin embargo puedes configurarla con las que necesites.

- `npm run test`: Ejecuta las pruebas unitarias para verificar el funcionamiento del front-end.

**IMPORTANTE**: Asegúrate de instalar las dependencias necesarias antes de ejecutar estos comandos. Consulta el archivo `package.json` para obtener más detalles sobre los scripts y las dependencias del proyecto.

### Configuración del Entorno

Antes de comenzar a utilizar este proyecto, es necesario configurar algunas variables de entorno para que todo funcione correctamente. Asegúrate de seguir estos pasos para configurar tu entorno correctamente:

1. **Script envs**: Asegúrate de ejecutar el script `npm run envs`. Igualmente cada vez que ejecutes `npm run start` o `npm run build`, el script se ejecutará.

2. **Archivo de Entorno**: En el directorio de tu proyecto, encontrarás un archivo llamado `environments.ts` dentro de la carpeta `src/environments`.

3. **Variables a Configurar**: Crea el archivo `environments.prod.ts` y copia los valores que tienes en el archivo `environments.ts`.
