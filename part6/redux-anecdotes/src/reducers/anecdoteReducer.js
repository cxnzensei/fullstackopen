import anecService from '../services/anecdotes'

export const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NEW':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE': {
      const id = action.data.id
      const anecToVote = state.find((anec) => anec.id === id)
      const changedAnec = {
        ...anecToVote,
        votes: anecToVote.votes + 1,
      }
      return state.map((anec) => (anec.id !== id ? anec : changedAnec))
    }
    default:
      return state
  }
}

export const createAnec = (data) => {
  return async (dispatch) => {
    const newAnec = await anecService.createNew(data)
    dispatch({
      type: 'ADD_NEW',
      data: newAnec,
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const upVote = (id) => {
  return async (dispatch) => {
    await anecService.changeVote(id)
    dispatch({
      type: 'VOTE',
      data: { id },
    })
  }
}
