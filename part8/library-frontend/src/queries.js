import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
fragment bookDetails on Book {
  title
  author {
    name
  }
  published
  id
  genres
}
`

export const ALL_BOOKS = gql`
query allBooks($genre: String) {
  allBooks(genre: $genre) {
    ...bookDetails
  }
}
${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...bookDetails
  }
}
${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`
export const AUTHOR_NAMES = gql`
query {
  allAuthors {
    name
    id
  }
}
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

export const ADD_BOOK = gql`
mutation createBook ($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ) {
        title
        author {
          name
          born
          id
        }
        published
        genres
        id
    }
}
`

export const EDIT_BIRTH = gql`
mutation editBirth ($name: String!, $born: Int!) {
    editAuthor(
        name: $name,
        born: $born
    ) {
        name
        born
        id
        bookCount
    }
}
`

export const LOGIN = gql`
mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`