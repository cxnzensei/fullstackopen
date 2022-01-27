import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { blogReducer } from './reducers/blogReducer'
import { notificationReducer } from './reducers/notificationReducer'
import { authReducer } from './reducers/authReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userReducer } from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  auth: authReducer,
  users: userReducer
})

export const store = createStore(
  reducer, composeWithDevTools(applyMiddleware(thunk))
)