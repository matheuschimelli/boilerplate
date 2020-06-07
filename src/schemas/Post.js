import { gql } from 'apollo-server-express'

const PostSchema = gql`

extend type Query {
     allPosts: [Post] 
}

type Post {
     id: ID!
     createdAt: String
     title: String
     content: String 
     published: Boolean
     author: User!
     authorId: ID!
}


input PostInput {
    title: String!
    content: String!
    published: Boolean
    authorId: ID!
  }

input RemovePostInput {
    postId: ID!
  }

extend type Mutation {
     createPost(input:PostInput): Post
     removePost(input: RemovePostInput): Post

}
`
export default PostSchema
