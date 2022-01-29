import { DateTimeResolver } from 'graphql-scalars'
import { Resolvers } from './lib/generated/graphql'
import { Context } from "./context"

export const resolvers: Resolvers<Context> = {
  Query: {
    allUsers: (_parent, _args, context, _info) => {
      return context.prisma.user.findMany()
    },
    feed: (_parent, args, context, _info) => {
      const or = args.q
        ? {
          OR: [
            { title: { contains: args.q } },
            { content: { contains: args.q } },
          ],
        }
      : {}
      return context.prisma.post.findMany({
        where: {
          published: true,
          ...or
        },
        include: { author: true },
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.sort || undefined,
      })
    },
    draftsByUser: (_parent, args, context, _info) => {
      return context.prisma.post.findMany({
        where: {
          author: {
            id: args.input?.id || undefined,
            email: args.input?.email || undefined
          },
          published: false
        },
        include: {
          author: true
        }
      })
    }
  },
  Mutation: {
    signup: (_parent, args, context, _info) => {
      return context.prisma.user.create(args)
    },
    createDraft: (_parent, args, context, _info) => {
      return context.prisma.post.create({
        data: {
          ...args.data,
          author: {
            connect: { email: args.authorEmail }
          }
        }
      })
    },
    deletePost: async (_parent, args, context, _info) => {
      return context.prisma.post.delete({
        where: { id: args.id },
      })
    },
    incrementPostViewCount: (_parent, args, context, _info) => {
      return context.prisma.post.update({
        where: { id: args.id },
        data: { viewCount: { increment: 1 } },
      })
    },
    togglePublishPost: (_parent, args, context, _info) => {
      return context.prisma.post.update({
        where: { id: args.id },
        data: { published: true },
      })
    },
  },
  DateTime: DateTimeResolver,
}