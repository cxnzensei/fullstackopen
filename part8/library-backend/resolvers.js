const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Book = require('./models/Book')
const User = require('./models/User')
const Author = require('./models/Author')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const secret = process.env.JWT_SECRET

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(!args.author && !args.genre) {
        const books = await Book.find({}).populate('author')
        return books
      } else {
        const books = await Book.find({}).populate('author')
        if(args.author) {
          return books.filter(book => book.author.name.toLowerCase() === args.author.toLowerCase())
        }
        if(args.genre) {
          return books.filter(book => book.genres.map(genre => genre.toLowerCase()).includes(args.genre.toLowerCase()))
        }
      }
    },
    allAuthors: async () => await Author.find({}),
    me: async (root, args, {currentUser}) => {
      return currentUser
    } 
  },
   Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author')
      return books.filter(book => book.author.name === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args, {currentUser}) => {
      if(!currentUser) {
        throw new AuthenticationError('Authentication: null')
      }
      const books = await Book.find({}).populate('author')
      const authors = await Author.find({})
      if(books.find(book => book.title.toLowerCase() === args.title.toLowerCase())) {
        throw new UserInputError('Title must be unique', {
          invalidArgs: args.title
        })
      }
      const author = authors.find(author => author.name.toLowerCase() === args.author.toLowerCase())
      if(!author) {
        let newAuthor = new Author({name: args.author})
        try {
          await newAuthor.save()
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args
          })
        }
      }
      const newAuthor = await Author.findOne({name: args.author})
      let newBook = new Book({...args, author: newAuthor})
      try {
        await newBook.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      
      return newBook
    },
    editAuthor: async (root, args, {currentUser}) => {
      if(!currentUser) {
        throw new AuthenticationError('Authentication: null')
      }
      if(!args.born) {
        throw new UserInputError('Enter birthyear', {
          invalidArgs: args
        })
      }
      const author = await Author.findOne({name: args.name})
      if(!author) {
        return null
      }
      author.born = args.born
      return author.save().catch((err) => {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      })
    },
    createUser: async (root, args) => {
      if(!args.username || !args.favoriteGenre) {
        throw new UserInputError('Enter a username and your favorite genre', {
          invalidArgs: args
        })
      }
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      return user.save().catch((err) => {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      if(!args.username || !args.password) {
        throw new UserInputError('Enter a username and password', {
          invalidArgs: args
        })
      }
      const user = await User.findOne({username: args.username})
      if(!user || args.password !='secret') {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user.id
      }
      return {
        value: jwt.sign(userForToken, secret)
      }
    }
  },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    },
}

module.exports = resolvers