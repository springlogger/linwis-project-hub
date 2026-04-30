import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../server/generated/prisma/client'

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  })
}

declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
