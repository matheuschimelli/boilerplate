import { gql } from 'apollo-server-express'

const ProfileSchema = gql`

type Profile {
     id: ID!
     bio: String
     user: User
     userId: ID!
}
`
export default ProfileSchema
