/* eslint-disable linebreak-style */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeUser } from './reducers/authReducer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SkewLoader } from 'react-spinners'
import dashboard from './pages/dashboard'
import signup from './pages/signup'
import blog from './pages/blog'
import users from './pages/users'
import user from './pages/user'
import login from './pages/login'

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initializeUser())
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [dispatch])


  return (
    <div>
      {loading ? (
        <div className='flex flex-col w-full bg-gray-50 space-y-4 items-center justify-center h-screen'>
          <SkewLoader loading={loading} size={40} />
        </div>
      ) : (
        <div className='p-3 flex flex-col'>
          <Router>
            <Switch>
              <Route exact path='/users/:id' component={user} />
              <Route exact path='/users' component={users} />
              <Route exact path='/blogs/:id' component={blog} />
              <Route exact path='/login' component={login} />
              <Route exact path='/signUp' component={signup} />
              <Route exact path='/' component={dashboard} />
            </Switch>
          </Router>
        </div>
      )}
    </div>
  )
}
export default App
