# Guitars API 🎸

API REST creada con Node.js, Express y Firebase Firestore.

## Rutas principales

- `POST /auth/login` → Obtener token JWT
- `GET /api/guitars` → Obtener todas las guitarras (protegido)
- `GET /api/guitars/:id` → Obtener guitarra por ID (protegido)
- `POST /api/guitars` → Crear guitarra (protegido)
- `PUT /api/guitars/:id` → Actualizar guitarra (protegido)
- `DELETE /api/guitars/:id` → Eliminar guitarra (protegido)

## Autenticación

Para acceder a las rutas protegidas es necesario obtener un token JWT mediante:

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "gam@guitars.com",
  "password": "TocaLaViolaEnLaMayor"
}
