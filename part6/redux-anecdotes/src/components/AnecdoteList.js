import { useSelector, useDispatch } from 'react-redux'
import { upVote } from '../reducers/anecdoteReducer'
import { voteNotif, removeNotif } from '../reducers/notificationReducer'

function AnecdoteList() {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  let operArray = anecdotes
    .sort((a, b) => (a.votes > b.votes ? -1 : 1))
    .filter((anec) => anec.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = (id, title) => {
    dispatch(upVote(id))
    dispatch(voteNotif(title))
    setTimeout(() => {
      dispatch(removeNotif())
    }, 5000)
  }

  return (
    <div>
      {operArray.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
