import userService from '../services/users'
import { addNotif } from './notificationReducer'

export const userReducer = (state = [], action) => {
  switch(action.type) {
  case 'ADD_NEW':
    return [...state, action.data]
  case 'INIT_USERS':
    return action.data
  }
  return state
}

export const initializeUsers = () => {
  return async(dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data : users
    })
  }
}

export const signUp = (credentials) => {
  return async (dispatch) => {
    try {
      const newUser = await userService.signUp(credentials)
      dispatch({
        type: 'ADD_NEW',
        data: newUser
      })
      dispatch(addNotif(`New account created for ${newUser.name}`, 5, 'green'))

    } catch (e) {
      dispatch(addNotif('Server issue', 5, 'red'))
    }
  }
}