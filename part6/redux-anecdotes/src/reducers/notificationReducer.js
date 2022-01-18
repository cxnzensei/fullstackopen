let blank = 0

export const notificationReducer = (state = null, action) => {
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
    clearTimeout(blank)
    blank = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIF',
        data: null,
      })
    }, time * 1000)

    dispatch({
      type: 'ADD_NOTIF',
      data: title,
    })
  }
}
