import blogService from '../services/blogs'
import { addNotif } from './notificationReducer'

export const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'ADD_NEW':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'DELETE': {
    const id = action.data.ID
    return state.filter((blog) => blog.id !== id)
  }
  case 'UPDATELIKES': {
    const id = action.data.ID
    const obj = action.data.obj
    return state.map((blog) => blog.id !== id ? blog : obj)
  }
  case 'UPDATECOMMENTS': {
    const id = action.data.ID
    const obj = action.data.obj
    return state.map((blog) => blog.id !== id ? blog : obj)
  }
  default:
    return state
  }
}

export const createBlog = (data) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(data)
    dispatch({
      type: 'ADD_NEW',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const deleteBlog = (ID, title, author) => {
  return async (dispatch) => {
    try {
      await blogService.remove(ID)
      dispatch({
        type: 'DELETE',
        data: { ID }
      })
      dispatch(addNotif(`deleted ${title} by ${author}`, 5, 'green'))
    } catch (e) {
      dispatch(addNotif('Couldn\'t delete the blog, please try again', 5, 'red'))
    }
  }
}

export const updateBlogLikes = (ID, obj) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'UPDATELIKES',
        data: { ID, obj }
      })
      await blogService.updateLikes(ID, obj)
    } catch(e) {
      dispatch(addNotif('Couldn\'t update the blog', 5, 'red'))
    }
  }
}

export const updateBlogComments = (ID, obj) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'UPDATECOMMENTS',
        data: { ID, obj }
      })
      await blogService.addComments(ID, obj)
    } catch (e) {
      dispatch(addNotif('Couldn\'t update the blog', 5, 'red'))
    }
  }
}