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
  return {
    type: 'ADD_NEW',
    data,
  }
}

export const initializeAnecdotes = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data,
  }
}

export const upVote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}
