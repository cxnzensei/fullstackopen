/* eslint-disable no-unused-vars */
import { useApolloClient, useSubscription } from '@apollo/client'
import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import Recs from './components/Recs'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return { allBooks: uniqByName(allBooks.concat(addedBook)), }
  })
}

const App = () => {
  const [error, setError] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data?.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const notify = (message) => {
    setError(message)
    setTimeout(() => {
      setError('')
    }, 1000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recs')}>recommendations</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')} >login</button>
        )}
      </div>
      <Notify error={error} />
      <Authors token={token} show={page === 'authors'} />
      <Books genre={genre} setGenre={setGenre} show={page === 'books'} />
      <Recs show={page === 'recs'} />
      <LoginForm setPage={setPage} setToken={setToken} setError={notify} show={page==='login'} />
      <NewBook genre={genre} setError={notify} show={page === 'add'} />
    </div>
  )
}

export default App