import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes, vote }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          <span style={{ margin: '0px 5px 0px 5px' }}>({anecdote.votes})</span>
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </li>
      ))}
    </ul>
  </div>
)

export default AnecdoteList
