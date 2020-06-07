import { gql } from 'apollo-server-express'

const UserSchema = gql`

extend type Query {
     authenticatedUse: User 
}

type User {
     id: ID!
     email: String
     name: String
     posts: [Post] 
     profile: Profile
     isAdmin: Boolean!
}

input SignupInput {
    email: String!
    name: String!
  }
  input UpdateUserInput {
    id:ID!
    email: String
    name: String
    isAdmin:Boolean
  }

extend type Mutation {
     createUser(input:SignupInput): User
     updateUser(input:UpdateUserInput): User

}
`
export default UserSchema
