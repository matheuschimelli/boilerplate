import { PrismaClient } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
const prisma = new PrismaClient()


const Mutation = {
  createUser: async (_, {
    input: {
      email,
      name
    }
  }) => {
    console.log(email, name)

    try {
      const createUser = await prisma.user.create({
        data: {
          email: email,
          name: name
        }
      })
      console.log(createUser)
      return createUser
    } catch (error) {
      console.log(error)
      if (error.code === 'P2002') {
        return new ApolloError(`Account Error: The email ${email} already is taken`, '400')
      }
    }
  },
  updateUser: async (_, {
    input: {
      id,
      email,
      name,
      isAdmin
    }
  }) => {
    console.log(email, name)

    try {
      const updateUser = await prisma.user.update({
        where: {
          id: id
        },
        data: {
          email: email,
          name: name

        }
      })
      console.log(updateUser)
      return updateUser
    } catch (error) {
      console.log(error)
      if (error.code === 'P2002') {
        return new ApolloError(`Account Error: The email ${email} already is taken`, '400')
      }
    }
  }
}

export default { Mutation }
