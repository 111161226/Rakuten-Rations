import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const createPrismaClient = () => {
  // 1. Postgresの接続プールを作成
  const pool = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
  // 2. ドライバアダプターを作成
  const adapter = new PrismaPg(pool)

  // 3. adapterを渡して初期化
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

const prisma = globalForPrisma.prisma ?? createPrismaClient()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma