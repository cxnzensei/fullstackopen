import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Notification() {
  const notification = useSelector((state) => state.notification)
  const auth = useSelector((state) => state.auth)
  return (
    <div
      className='max-h-fit my-3 flex items-center bg-gray-100 border-2 rounded-md px-2 py-4 border-gray-500'
    >
      {notification ? (
        <div className='break-all'>{notification}</div>
      ) : (
        (auth ? (
          <div className='break-all'>
          logged in as {''}
            <Link to={`/users/${auth.id}`} className='font-bold hover:underline underline-offset-2 text-blue-700'>
              {auth?.name}
            </Link>
          </div>
        ) : (
          <div>
            <Link to='/login' className='font-bold hover:underline cursor-pointer'>
              Login
            </Link>{' '}
            to Continue
          </div>
        ))
      )}
    </div>
  )
}

export default Notification
