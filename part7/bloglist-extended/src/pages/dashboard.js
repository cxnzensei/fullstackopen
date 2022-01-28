import Header from '../components/Header'
import { useSelector } from 'react-redux'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import Blogs from '../components/Blogs'

const dashboard = () => {
  const auth = useSelector(state => state.auth)
  return <div>
    <Header />
    {auth ? (
      <Togglable firstButton='+' lastButton='Cancel'>
        <div className='border rounded-md p-4 my-3 md:max-w-lg'>
          <BlogForm />
        </div>
      </Togglable>
    ) : null}
    <Blogs />
  </div>
}

export default dashboard
