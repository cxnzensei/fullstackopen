import { createStore } from 'redux'
import { anecdoteReducer } from './reducers/anecdoteReducer'
import { notificationReducer } from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers } from 'redux'
import { filterReducer } from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
})

export const store = createStore(reducer, composeWithDevTools())
