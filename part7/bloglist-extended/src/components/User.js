import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const User = () => {
  const users = useSelector(state => state.users)
  const ID = useParams().id
  const user = users.find(user => user.id === ID)
  return (
    <div className='lg:flex'>
      <div className='my-5 lg:w-6/12 lg:flex lg:flex-col'>
        <div className='flex items-center border py-4 px-5 rounded shadow-sm space-x-4'>
          <div className='text-5xl border-2 h-20 w-20 flex items-center justify-center shadow uppercase rounded-full'>{user?.name.substring(0, 1)}</div>
          <div>
            <div className='text-2xl'>{user?.name}</div>
            <div className='font-bold'>{user?.username}</div>
          </div>
        </div>
        <div className='my-5'>
          <div className='my-4 text-3xl'>
            {user?.blogs.length === 0 ? 'No blogs added' : 'Blogs added'}
          </div>
          <div>
            {user?.blogs.length === 0 && (
              <div>You can start adding blogs by click on{' '}
                <span className='bg-black px-4 py-2 rounded-md text-lg text-slate-50'>+</span>{' '}
                from{' '}
                <Link to='/'>
                  <span className='underline underline-offset-2 font-bold'>here</span>
                </Link>
              </div>
            )}
          </div>
          <div className={`${user?.blogs.length !== 0 && 'bg-gray-200'} max-h-[27rem] overflow-y-scroll scrollbar_hide p-2 rounded-md`}>
            {user?.blogs.map((blog) => (
              <Link key={blog.id} to={`/blogs/${blog.id}`}>
                <div className='border p-3 flex justify-between bg-white hover:shadow-md my-2 rounded-md hover:text-gray-500'>
                  <div>{blog.title}</div>
                  <div className='bg-gray-800 hover:bg-gray-200 rounded-md w-1/12'></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className='hidden max-w-screen-sm -mt-10 lg:w-6/12 lg:inline-block'>
        <img className='rotate-90 h-min' src="/images/2.png" alt="blogs" />
      </div>
    </div>
  )
}



export default User