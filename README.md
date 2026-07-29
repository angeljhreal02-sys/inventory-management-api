# 📦 Inventory Management API

Sistema REST para la gestión de inventario desarrollado con **Node.js**, **Express** y **MongoDB**.

El proyecto implementa un CRUD completo de productos y posteriormente integrará el consumo de una API REST externa para enriquecer la información del inventario.

---

## 🚀 Tecnologías

- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios
- dotenv
- CORS

---

## 📂 Estructura del proyecto

```text
inventory-management-api
│
├── src
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── project_architecture.txt
```

---

## ✨ Funcionalidades

- CRUD de productos
- Gestión de inventario
- Arquitectura MVC
- API REST
- Integración con MongoDB
- Consumo de API REST externa *(próximamente)*

---

## 📌 Endpoints

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | /api/products | Obtener todos los productos |
| GET | /api/products/:id | Obtener un producto |
| POST | /api/products | Crear producto |
| PUT | /api/products/:id | Actualizar producto |
| DELETE | /api/products/:id | Eliminar producto |

---

## ⚙️ Instalación

```bash
git clone <URL_DEL_REPOSITORIO>

cd inventory-management-api

npm install
```

Crear un archivo `.env` usando como base `.env.example`.

Ejecutar el proyecto:

```bash
npm run dev
```

---

## 👨‍💻 Autor

**Angel Ernesto Jimenez Hernandez**

GitHub:
https://github.com/angeljhreal02-sys