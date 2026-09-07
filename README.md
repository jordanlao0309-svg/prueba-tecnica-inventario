# 📦 Sistema de Gestión de Inventario de Equipos TI

Sistema integral Full Stack para la gestión, registro, control de estado y auditoría de equipos de cómputo del laboratorio/institución. Desarrollado como solución a la prueba técnica para practicante preprofesional.

---

## 🛠️ Stack Tecnológico

* **Backend:** Node.js, Express, TypeScript (Modo estricto, sin `any`), Prisma ORM, Swagger (OpenAPI 3.0), CORS.
* **Base de Datos:** PostgreSQL 16 (Relacional).
* **Frontend:** React 19, TypeScript, Vite, Vanilla CSS (Sistema de diseño moderno Dark Mode con Glassmorphism), Lucide React.
* **Contenedores:** Docker, Docker Compose, Nginx (Multi-stage build).
* **Control de Versiones:** Git con estrategia de ramas y Conventional Commits.

---

## 🚀 Instrucciones para Ejecutar con Docker (Recomendado)

El proyecto está 100% dockerizado y orquesta los 3 servicios necesarios (**PostgreSQL**, **Backend API** y **Frontend**) con un único comando.

### 1. Requisitos Previos
* Tener instalado **Docker Desktop** (con Docker Compose activo).

### 2. Pasos de Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/TU_USUARIO/prueba-tecnica-inventario.git
   cd prueba-tecnica-inventario
   ```

2. **Crear archivo de variables de entorno:**
   Copia el archivo de ejemplo `.env.example` como `.env` en la raíz (opcional, ya incluye valores por defecto optimizados):
   ```bash
   cp .env.example .env
   ```

3. **Construir y levantar los contenedores:**
   ```bash
   docker compose up --build
   ```
   *(o con `docker-compose up --build`)*

4. **Acceder a los servicios:**
   * 🌐 **Frontend (Interfaz Web):** [http://localhost:5173](http://localhost:5173)
   * ⚙️ **Backend API (Healthcheck):** [http://localhost:3000](http://localhost:3000)
   * 📄 **Documentación Swagger UI:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
   * 🗄️ **Base de Datos PostgreSQL:** Puerto `5432`

---

## 💻 Ejecución en Modo Desarrollo (Sin Docker)

Si deseas ejecutar cada servicio de forma local en tu máquina:

### Backend:
1. `cd backend`
2. `npm install`
3. Configurar `.env` con la conexión a PostgreSQL (`DATABASE_URL`).
4. `npx prisma db push`
5. `npm run dev` *(Disponible en `http://localhost:3000`)*

### Frontend:
1. `cd frontend`
2. `npm install`
3. `npm run dev` *(Disponible en `http://localhost:5173`)*

---

## 📄 Documentación de la API (Swagger)

La API cuenta con documentación interactiva bajo el estándar OpenAPI 3.0. Puedes probar todos los métodos HTTP directamente desde el navegador en:

👉 **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

### Endpoints Disponibles:

| Método | Endpoint | Descripción | Códigos de Estado |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/equipos` | Listar todos los equipos registrados | `200`, `500` |
| `GET` | `/api/equipos/:id` | Obtener detalle de un equipo por ID | `200`, `400`, `404`, `500` |
| `POST` | `/api/equipos` | Registrar un nuevo equipo | `201`, `400`, `409`, `500` |
| `PUT` | `/api/equipos/:id` | Actualizar información de un equipo | `200`, `400`, `404`, `409`, `500` |
| `DELETE` | `/api/equipos/:id` | Eliminar un equipo del inventario | `204`, `400`, `404`, `500` |

---

## ⚙️ Configuración de Variables de Entorno

### Archivo `.env` (Raíz del proyecto):
```env
# Credenciales PostgreSQL
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=inventario_db
DB_PORT=5432

# Backend
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/inventario_db?schema=public

# Frontend
VITE_API_URL=http://localhost:3000/api/equipos
```

---

## 🌿 Estrategia de Ramas y Git (Workflow)

El proyecto sigue una estrategia de ramificación basada en funcionalidades con commits atómicos:

* `main` / `master`: Código estable de producción.
* `development`: Rama principal de integración y desarrollo.
* Ramas de características (Features):
  * `feature/backend-crud`: Estructura inicial del backend, modelos Prisma y operaciones CRUD.
  * `feature/swagger-docs`: Configuración de Swagger UI y especificación OpenAPI.
  * `feature/frontend-ui`: Construcción de interfaz en React + Vite + CSS.
  * `fix/docker-config`: Configuración de Dockerfiles y docker-compose.yml.