import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Blogs() {
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector(state => state.users)
  const auth = useSelector(state => state.auth)
  const findUser = (userId) => {
    let user = users.find(user => user.id === userId)
    return user?.username
  }

  let sortedBlogs = blogs.sort((a, b) =>
    a.likedBy.length > b.likedBy.length ? -1 : 1
  )

  return (
    <>
      {blogs && (
        <div className='grid my-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4'>
          {sortedBlogs.length === 0 ? (
            <div className='text-xl my-2'>Nothing to show</div>
          ) : (
            sortedBlogs.map((blog) => (
              <Link key={blog.id} to={ auth ? `/blogs/${blog.id}` : '/login'}>
                <div
                  className='text-xl border rounded-md px-2 my-2 max-w-full py-2 pb-3 hover:scale-95 duration-300 ease-in-out'
                >
                  <div className='font-bold text-sm max-w-fit bg-blue-400 p-2 my-2 rounded-br-2xl'>
                    {findUser(blog.user)}
                  </div>
                  <div className='font-semibold break-all max-w-[30ch] text-gray-600'>{blog.title}</div>
                  <div className='font-medium break-all text-base'>by {blog.author}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </>
  )
}

export default Blogs