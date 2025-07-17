# Stock Guitars API 🎸

Una API REST desarrollada con **Node.js**, **Express** y **Firebase Firestore** para gestionar un catálogo de guitarras.

## Características

- CRUD de guitarras (`GET`, `POST`, `PUT`, `DELETE`)
- Rutas protegidas con **JWT**
- Autenticación básica (`/auth/login`)
- Deploy en **Vercel**

## Rutas principales

- `POST /auth/login`: Devuelve un token JWT con usuario predefinido.
- `GET /api/guitars`: Lista todas las guitarras (**requiere token**).
- `GET /api/guitars/:id`: Guitarra por ID (**requiere token**).
- `POST /api/guitars`: Crea guitarra (**requiere token**).
- `PUT /api/guitars/:id`: Actualiza guitarra (**requiere token**).
- `DELETE /api/guitars/:id`: Elimina guitarra (**requiere token**).

## Usuario de prueba

```json
{
  "email": "gam@guitars.com",
  "password": "TocaLaViolaEnLaMayor"
}
