# API Profeteca Imágenes / PDF

Servicio Express para generación legacy de imágenes (Puppeteer) y PDF (EJS). Por defecto **MongoDB está desactivado** (`MONGODB_ENABLED=false`).

## Arranque

```bash
cd api
npm install
npm run dev
```

Configurá `api/.env` según `.env.example`. Para persistencia, ver [`docs/PERSISTENCE.md`](../docs/PERSISTENCE.md).

## Endpoints principales

- `GET /api` — mensaje de bienvenida
- `/imagen/*`, `/pdf/*`, `/api/uploads/*` — requieren MongoDB activo
- `/api/usuario/login` — JWT con credenciales de entorno (no usa MongoDB)
