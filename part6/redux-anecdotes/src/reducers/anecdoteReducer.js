import uniqid from 'uniqid'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: uniqid(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW':
      return [...state, action.data]
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

export const createAnec = (content) => {
  return {
    type: 'ADD_NEW',
    data: {
      content,
      votes: 0,
      id: uniqid(),
    },
  }
}

export const upVote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}
