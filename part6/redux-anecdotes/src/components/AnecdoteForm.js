import { createAnec } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { addNotif, removeNotif } from '../reducers/notificationReducer'
import anecServices from '../services/anecdotes'

function AnecdoteForm() {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnec = await anecServices.createNew(content)
    dispatch(createAnec(newAnec))
    dispatch(addNotif(content))
    setTimeout(() => {
      dispatch(removeNotif())
    }, 5000)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
