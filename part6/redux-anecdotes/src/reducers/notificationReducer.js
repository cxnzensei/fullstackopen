const blank = ''

export const notificationReducer = (state = blank, action) => {
  switch (action.type) {
    case 'ADD_NOTIF':
      return action.data
    case 'REMOVE_NOTIF':
      return action.data
    default:
      return state
  }
}

export const addNotif = (title, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_NOTIF',
      data: title,
    })

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIF',
        data: blank,
      })
    }, time * 1000)
  }
}
