import { PrismaClient } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
const prisma = new PrismaClient()

const Query = {
  allPosts: async () => {
    const posts = await prisma.post.findMany()
    return posts
  }
}

const Mutation = {
  createPost: async (_, {
    input: {
      title,
      content,
      published,
      authorId
    }
  }, context) => {
    try {
      const createPost = await prisma.post.create({
        data: {
          title: title,
          content: content,
          published: true,
          author: {
            connect: {
              id: Number(authorId)
            }
          }
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
              id: true,
              Post: true

            }
          }
        }
      })
      console.log(createPost)
      return createPost
    } catch (error) {
      console.log(error)
      return new ApolloError('Database Error: waht???', '400')
    }
  },

  removePost: async (_, {
    input: {
      postId
    }
  }, context) => {
    try {
      const removePost = await prisma.post.delete({
        where: {
          id: Number(postId)
        }
      })
      console.log(removePost)
      return removePost
    } catch (error) {
      console.log(error)
      return new ApolloError('Database Error: waht???', '400')
    }
  }
}

export default { Query, Mutation }
