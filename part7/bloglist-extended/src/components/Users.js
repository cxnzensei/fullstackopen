import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)
  return (
    <>
      <div className='text-3xl my-4'>Users</div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {users.map((user) => (
          <Link className='hover:animate-pulse hover:scale-105 duration-300' key={user?.id} to={`/users/${user?.id}`}>
            <div className='border rounded py-3 px-5'>
              <div className='text-xl break-words'>{user?.name}</div>
              <div className='text-sm break-words text-gray-600'>{user?.username}</div>
              <div className='bg-red-400 py-2 px-4 rounded-br-md rounded-bl-2xl text-white max-w-fit mt-2'>{user?.blogs.length} {user?.blogs.length === 1 ? 'blog' : 'blogs'}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}



export default Users