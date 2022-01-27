/* eslint-disable linebreak-style */
import { useEffect } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import SignUpForm from './components/SignUpForm'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeUser } from './reducers/authReducer'
import Header from './components/Header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Blog from './components/Blog'
import { useSelector } from 'react-redux'
import { Suspense } from 'react'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'

function App() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <div className='p-3 flex flex-col'>
      <Router>
        <Suspense fallback={
          <div className='flex h-screen items-center justify-center'>
            <img src="/images/loading.gif" alt="loading" className='w-10 h-10' />
          </div>
        }>
          <Switch>
            <Route exact path='/users/:id'>
              <Header />
              <User />
            </Route>
            <Route exact path='/users'>
              <Header />
              <Users />
            </Route>
            <Route exact path='/blogs/:id'>
              <Header />
              <Blog />
            </Route>
            <Route exact path='/login'>
              <Notification />
              <LoginForm />
            </Route>
            <Route exact path='/signUp'>
              <Notification />
              <SignUpForm />
            </Route>
            <Route exact path='/'>
              <Header />
              {auth ? (
                <Togglable firstButton='+' lastButton='Cancel'>
                  <div className='border rounded-md p-4 my-3 md:max-w-lg'>
                    <BlogForm />
                  </div>
                </Togglable>
              ) : null}
              <Blogs />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  )
}
export default App
