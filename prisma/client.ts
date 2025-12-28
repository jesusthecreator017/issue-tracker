import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../generated/prisma/client'

const adapter = new PrismaMariaDb({
    user: 'root',
    password: process.env.DATABASE_PASSWORD,
    host: 'localhost',
    port: 3306,
    database: 'mydb',
    connectionLimit: 5,
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;