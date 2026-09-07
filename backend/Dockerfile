# ==========================================
# Dockerfile para Backend (Node.js + TypeScript + Prisma)
# ==========================================

FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias de compilación
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# Copiar código fuente y generar cliente Prisma
COPY tsconfig.json ./
COPY src ./src/

RUN npx prisma generate
RUN npm run build

# ==========================================
# Etapa de Producción
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias de producción y cliente Prisma
RUN npm install --omit=dev
RUN npx prisma generate

# Copiar archivos compilados desde el builder
COPY --from=builder /app/dist ./dist

# Puerto expuesto
EXPOSE 3000

# Script de arranque: Sincroniza el esquema con PostgreSQL e inicia el servidor
CMD ["sh", "-c", "npx prisma db push && node dist/index.js"]
