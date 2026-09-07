import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// 1. Configuramos la conexión usando tu variable de entorno
const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });

// 2. Le pasamos el adaptador de Postgres a Prisma
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;