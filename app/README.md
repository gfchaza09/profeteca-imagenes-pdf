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

<!--! Completar -->

<a name="rutas"></a>

## 3. Rutas de la aplicación

A continuación se describen las rutas disponibles en la aplicación:

- **Iniciar Sesión**: `/auth/login`
  - Descripción: Página de inicio de sesión para acceder a la aplicación.
  
- **Lista de Tickets**: `/dashboard/home`
  - Descripción: 
  - Requisitos: Requiere autenticación.

- **Lista de Tickets**: `/dashboard/upload`
  - Descripción: 
  - Requisitos: Requiere autenticación.

- **Detalles del Ticket**: `/dashboard/config`
  - Descripción: 
  - Requisitos: Requiere autenticación.

- **Ruta por Defecto**: `/**`
  - Descripción: Ruta por defecto en caso de que ninguna coincida, redirige a la Página principal.

<a name="tecnologias"></a>

## 4. Tecnologías utilizadas

Las tecnologías utilizadas en el front-end de Trami-Imagenes son las siguientes:

- **Angular**: Angular es un framework de desarrollo de aplicaciones web de código abierto basado en TypeScript. Proporciona una estructura robusta para construir aplicaciones web modernas y dinámicas.
- **Bootstrap**: Bootstrap es un framework de diseño CSS ampliamente utilizado que ofrece una amplia variedad de componentes y estilos predefinidos. Facilita la creación de interfaces de usuario atractivas y responsivas.
- **SweetAlert2**: SweetAlert2 es una biblioteca que permite mostrar alertas y modales personalizables en tu aplicación. Ofrece una experiencia de usuario más interactiva y atractiva al mostrar información importante.
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
