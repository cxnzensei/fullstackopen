import { useParams } from 'react-router'

const Anecdote = ({ anecdotes, vote }) => {
  const id = useParams().id
  let anecdote = anecdotes.find((anec) => anec.id === id)
  return (
    <div>
      <div style={{ fontSize: '30px', margin: '10px 0px 10px 0px' }}>
        {anecdote?.content}
      </div>
      <div style={{ fontSize: '20px', margin: '10px 0px 10px 0px' }}>
        has {anecdote?.votes} {anecdote?.votes === 1 ? 'vote' : 'votes'}
      </div>
      <div>
        for more info, see <a href={`${anecdote?.info}`}>{anecdote?.info}</a>
      </div>
      <button
        style={{ margin: '10px 0px 10px 0px' }}
        onClick={() => vote(anecdote.id)}
      >
        vote
      </button>
    </div>
  )
}

export default Anecdote
