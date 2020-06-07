import { gql } from 'apollo-server-express'

import UserSchema from './User'
import PostSchema from './Post'
import ProfileSchema from './Profile'

const schema = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
  ${PostSchema}
  ${UserSchema}
  ${ProfileSchema}


`

export default schema
