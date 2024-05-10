import { graphql } from "@/gql"



export const verifyUserGoogleToken =graphql(`
#graphql
query  VerifyUserGoogleToken($token:String!){
    verifyGoogleToken(token: $token)
}
`)
export const getCurrentUserQuery =graphql(`
  query GetCurrentUser {
    getCurrentUser {
      id
      firstName
      email
      profileImageUrl
      lastName
      followers{
        id
        firstName
        lastName
        profileImageUrl
      }
      following{
        id
        firstName
        lastName
        profileImageUrl
      }
      tweets{
        id
        content 
        author{
          id
          firstName
          lastName
          profileImageUrl

        }
      }
    }
  }
`)
export const getUserByIdQuery =graphql(`
query GetUserById($id: ID!) {
  getUserById(id: $id) {
    profileImageUrl
    followers{
      id
      firstName
      lastName
      profileImageUrl
    }
    following{
      id
      firstName
      lastName
      profileImageUrl
    }
    lastName
    id
    firstName
    tweets {
      imageUrl
      content
      author {
        id
        lastName
        profileImageUrl
        firstName
      }
    }
  }
}
`)



