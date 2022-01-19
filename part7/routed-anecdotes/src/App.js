import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import uniqid from 'uniqid'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { CreateNew } from './components/CreateNew'
import { Notification } from './components/Notification'

const padding = {
  paddingRight: 5,
}

let blank = 0

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 'kyl68aao',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 'kyl68aap',
    },
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = uniqid()
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`You added : ${anecdote.content}`)
    clearTimeout(blank)
    blank = setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const vote = (id) => {
    const anecdote = anecdotes.find((anec) => anec.id === id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    setAnecdotes(anecdotes.map((anec) => (anec.id !== id ? anec : voted)))
    setNotification(`You voted : ${anecdote.content}`)
    clearTimeout(blank)
    blank = setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return (
    <Router>
      <h1>Software anecdotes</h1>
      <Link style={padding} to='/'>
        about
      </Link>
      <Link style={padding} to='/anecdotes'>
        anecdotes
      </Link>
      <Link style={padding} to='/create'>
        create new
      </Link>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdotes={anecdotes} vote={vote} />
        </Route>
        <Route path='/anecdotes'>
          <AnecdoteList anecdotes={anecdotes} vote={vote} />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} setNotification={setNotification} />
        </Route>
        <Route path='/'>
          <About />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
