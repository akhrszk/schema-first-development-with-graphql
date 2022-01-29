import { PrismaClient } from "@prisma/client"
import { FastifyReply, FastifyRequest } from "fastify"

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

export interface Context {
  prisma: PrismaClient
}

export const context: Context = {
  prisma
}

export const buildContext = async (
  _req: FastifyRequest,
  _reply: FastifyReply
): Promise<Context> => {
  return { prisma }
}
