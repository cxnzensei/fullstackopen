import { useSelector, useDispatch } from 'react-redux'
import { upVote } from '../reducers/anecdoteReducer'

function AnecdoteList() {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  let sortedAnecdotes = anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1))

  const vote = (id) => {
    dispatch(upVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
