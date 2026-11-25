# Profeteca Imágenes — Editor de publicaciones

Aplicación web (Angular 16) para diseñar publicaciones de Instagram y Facebook para **Profeteca**: lienzo libre con imágenes y textos, exportación PNG a 1080px y tipografía alineada con la app móvil (`profeteca_app`).

## Inicio rápido

```bash
cd app
npm install
npm start
```

Abrí `http://localhost:4200`. En modo local (`LOCAL_MODE=true`, por defecto) **no hace falta login ni base de datos**.

Variables opcionales en `.env` (raíz `app/`):

| Variable     | Default               | Descripción        |
|-------------|------------------------|--------------------|
| `API_URL`   | `http://localhost:8080`| URL de la API      |
| `LOCAL_MODE`| `true`                 | Omite login JWT    |

## Editor

- Formatos: **1080×1080**, **1080×1350**, **1080×1920**
- Plantillas de fondo en [`src/assets/templates/`](src/assets/templates/) (ver README de esa carpeta)
- Fuentes: **Plus Jakarta Sans** (Google Fonts) + alternativas del sistema
- Presets de texto inspirados en [`profeteca_app`](../profeteca_app): título 26px/700 `#131B2E`, cuerpo 16px `#434655`, acento `#2563EB`
- Exportar **PNG** (`profeteca-{formato}.png`) e importar/exportar diseño **JSON**

## Módulo PDF (legacy API)

Las rutas `/dashboard/pdf/*` siguen en el código pero requieren MongoDB en la API. Ver [`docs/PERSISTENCE.md`](../docs/PERSISTENCE.md).

## Scripts

- `npm start` — entorno + `ng serve`
- `npm run build` — build de producción
- `npm test` — pruebas unitarias Karma

## Stack

Angular 16, Bootstrap 5, Fabric.js 5, SweetAlert2.
