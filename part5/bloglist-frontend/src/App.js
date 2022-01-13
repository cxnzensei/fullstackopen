/* eslint-disable linebreak-style */
import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import signUpService from './services/signUp'
import Togglable from './components/Togglable'
import SignUpForm from './components/SignUpForm'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState({
    message: '',
    color: '',
  })
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({
        message: 'Wrong Credentials',
        color: 'red',
      })
      setTimeout(() => {
        setNotification({
          message: '',
          color: '',
        })
      }, 4000)
    }
  }

  const handleSignUp = async(event) => {
    event.preventDefault()
    try {
      const newUser = await signUpService.signUp({ username, password, name })
      console.log(newUser)
      setUsername('')
      setPassword('')
      setName('')
      setNotification({
        message: `Account created for ${newUser.name}`,
        color: 'green'
      })
      setTimeout(() => {
        setNotification({
          message: '',
          color: '',
        })
      }, 4000)
    } catch (err) {
      setNotification({
        message: 'Server Issue',
        color: 'red'
      })
      setTimeout(() => {
        setNotification({
          message: '',
          color: '',
        })
      }, 4000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    if (title.length === 0 || author.length === 0 || url.length === 0) {
      setNotification({
        message: 'One or more fields are missing',
        color: 'red',
      })
      setTimeout(() => {
        setNotification({
          message: '',
          color: '',
        })
      }, 4000)
    } else {
      try {
        blogService
          .create({ title: title, author: author, url: url })
          .then((returnedData) => {
            setBlogs(blogs.concat(returnedData))
          })
        setNotification({
          message: `A new blog ${title} by ${author} added`,
          color: 'green',
        })
        setTimeout(() => {
          setNotification({
            message: '',
            color: '',
          })
        }, 4000)
        setTitle('')
        setAuthor('')
        setUrl('')
      } catch (err) {
        setNotification({
          message: `Cannot add ${title} `,
          color: 'red',
        })
        setTimeout(() => {
          setNotification({
            color: '',
            message: '',
          })
        }, 4000)
      }
    }
  }

  const updateBlog = async (ID) => {
    let updatedBlog = blogs.find((blog) => blog.id === ID)
    if (updatedBlog.likedBy.includes(user.id)) {
      updatedBlog.likedBy = updatedBlog.likedBy.filter((ids) => ids !== user.id)
    } else {
      updatedBlog.likedBy.push(user.id)
    }
    blogService.update(ID, updatedBlog).then((returnedData) => {
      setBlogs(blogs.map((blog) => (blog.id !== ID ? blog : returnedData)))
    })
  }

  const deleteBlog = async (ID) => {
    let blog = blogs.find((blog) => blog.id === ID)
    let conf = window.confirm(`Remove >> ${blog.title} by ${blog.author}?`)
    if(conf) {
      try {
        setBlogs(blogs.filter((blog) => blog.id !== ID))
        await blogService.remove(ID)
        setNotification({
          message: `The blog ${blog.title} by ${blog.author} was removed`,
          color: 'red',
        })
        setTimeout(() => {
          setNotification({
            message: '',
            color: '',
          })
        }, 4000)
      } catch (err) {
        setNotification({
          message: 'The blog was not removed',
          color: 'red',
        })
        setTimeout(() => {
          setNotification({
            message: '',
            color: '',
          })
        }, 4000)
      }
    }
  }

  const logOut = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div className='p-3 flex flex-col'>
      <div className='text-3xl font-bold'>Blogs</div>
      <div>
        <Notification notification={notification} />
      </div>
      <div className='order-1 mt-7'>
        <h3 className='text-3xl mb-3'>Blogs</h3>
        <Blogs
          blogs={blogs}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      </div>
      <div className='order-2 text-sm p-2 px-4 bg-slate-200 rounded-md max-w-fit'>
        Bloglist App
      </div>
      <div>
        {user === null ? (
          <div>
            <Togglable firstButton='Login' lastButton='Cancel Login'>
              <div className='my-2'>
                <LoginForm
                  handleLogin={handleLogin}
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                />
              </div>
            </Togglable>
            <Togglable firstButton='Sign up' lastButton='Cancel sign up'>
              <div className='my-2'>
                <SignUpForm
                  handleSignUp={handleSignUp}
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  name={name}
                  setName={setName}
                />
              </div>
            </Togglable>
          </div>
        ) : (
          <div>
            <div className='flex flex-col'>
              <div className='text-xl'>
                logged in as{' '}
                <span className='font-bold underline'>{user.name}</span>
              </div>
              <div>
                <button
                  onClick={logOut}
                  className='text-lg bg-red-400 px-4 py-2 rounded-md mt-2 hover:scale-95 duration-300 ease-in-out'
                >
                  logout
                </button>
              </div>
            </div>
            <Togglable firstButton='Create a new blog' lastButton='Cancel'>
              <div className='border rounded-md p-4 my-3 max-w-[50%]'>
                <BlogForm
                  addBlog={addBlog}
                  title={title}
                  setTitle={setTitle}
                  author={author}
                  setAuthor={setAuthor}
                  url={url}
                  setUrl={setUrl}
                />
              </div>
            </Togglable>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
