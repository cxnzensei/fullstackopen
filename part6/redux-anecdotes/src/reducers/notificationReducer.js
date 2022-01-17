const blank = ''

export const notificationReducer = (state = blank, action) => {
  switch (action.type) {
    case 'VOTE_NOTIF':
      return (
        <span>
          you voted <strong>'{action.data}'</strong>
        </span>
      )
    case 'ADD_NOTIF':
      return (
        <span>
          you added <strong>'{action.data}'</strong>
        </span>
      )
    case 'REMOVE_NOTIF':
      return action.data
    default:
      return state
  }
}

export const voteNotif = (title) => {
  return {
    type: 'VOTE_NOTIF',
    data: title,
  }
}

export const addNotif = (title) => {
  return {
    type: 'ADD_NOTIF',
    data: title,
  }
}

export const removeNotif = () => {
  return {
    type: 'REMOVE_NOTIF',
    data: blank,
  }
}
