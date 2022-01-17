const blank = ''

export const filterReducer = (state = blank, action) => {
  if (action.type === 'SEARCH') {
    return action.data
  }
  return state
}

export const searchFunc = (key) => {
  return {
    type: 'SEARCH',
    data: key,
  }
}
