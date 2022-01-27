import loginService from '../services/login'
import blogService from '../services/blogs'
import { addNotif } from './notificationReducer'


export const authReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'INIT_USER':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      dispatch({
        type: 'LOGIN',
        data: user
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      await blogService.setToken(user.token)
    } catch(e) {
      dispatch(addNotif('wrong credentials', 5, 'red'))
    }
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      await blogService.setToken(user.token)
      dispatch({
        type : 'INIT_USER',
        data: user
      })
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}
