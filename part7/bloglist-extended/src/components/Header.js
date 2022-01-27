import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/authReducer'
import Notification from '../components/Notification'
import { Link, useHistory } from 'react-router-dom'


const Header = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const history = useHistory()

  return (
    <>
      <div className='md:flex md:items-center md:justify-between'>
        <Link to='/'>
          <div className='flex justify-center mr-3.5 hover:scale-105 duration-300 ease-in-out items-center'>
            <img src="/images/1.png" alt="blogsLogo" className='h-28' />
            <div className="text-2xl">BlogApp</div>
          </div>
        </Link>
        <div className='text-center md:text-inherit'>
          {auth && (
            <div className='font-bold space-x-3'>
              <Link className='px-4 py-3 hover:bg-gray-200 focus:bg-gray-400 rounded-lg' to='/'>Blogs</Link>
              <Link className='px-4 py-3 hover:bg-gray-200 focus:bg-gray-400 rounded-lg' to='/users'>Users</Link>
              <button className='px-4 py-3 font-bold hover:bg-gray-200 focus:bg-gray-400 rounded-lg' onClick={() => {
                dispatch(logout())
                history.push('/login')
              }}>logout</button>
            </div>
          )}
        </div>
      </div>
      <Notification />
    </>
  )
}

export default Header
