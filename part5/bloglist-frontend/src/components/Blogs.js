import { useState, useEffect } from 'react'
import Togglable from './Togglable'
import signUpService from '../services/signUp'

function Blogs({ blogs, updateBlog, deleteBlog, user }) {

  const [users, setUsers] = useState([])

  useEffect(() => {
    signUpService.getAllUsers().then((users) => setUsers(users))
  }, [])

  const username = (ID) => {
    return users.filter((user) => user.id === ID).map((un) => un.username)
  }

  let sortedBlogs = blogs.sort((a, b) =>
    a.likedBy.length > b.likedBy.length ? -1 : 1
  )

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-x-4'>
      {sortedBlogs.length === 0 ? (
        <div>Nothing to show</div>
      ) : (
        sortedBlogs.map((blog) => (
          <div
            key={blog.id}
            className='text-xl border rounded-md px-2 my-2 max-w-full py-2 pb-3 hover:scale-95 duration-300 ease-in-out'
          >
            <div className='font-semibold text-gray-600'>{blog.title}</div>
            <Togglable firstButton='View' lastButton='hide'>
              <div className='font-medium text-base'> by {blog.author}</div>
              <div>
                &#8635;{' '}
                <span className='hover:underline hover:text-gray-900 text-gray-500 cursor-pointer'>
                  <a href={`${blog.url}`} target='_blank' rel="noreferrer">
                    {`${blog.url.substring(0,25)}...`}
                  </a>
                </span>
              </div>
              {user ? (
                <>
                  <div>
                    <button
                      onClick={() => {
                        updateBlog(blog.id)
                      }}
                      className={
                        blog.likedBy.includes(user.id)
                          ? 'px-3 py-1 mt-1 pr-4 rounded-md text-base bg-slate-700 text-white hover:scale-95 duration-300 ease-in-out max-w-fit'
                          : 'text-base px-3 mt-1 py-1 pr-4 bg-slate-200 rounded-md hover:scale-95 duration-300 ease-in-out max-w-fit'
                      }
                    >
                      &#128077;{blog.likedBy.length}
                    </button>
                    <div className='text-xs mt-2'>
                      posted by <span className='underline'>{username(blog.user)}</span>
                    </div>
                    <div className='flex items-center space-x-[2px]'>
                      <div className='text-xs mr-1'>
                        {blog.likedBy.length === 0 ? 'be the first person to like this' : 'liked by'}
                      </div>
                      {blog.likedBy.map((likeBy) => (
                        <div className='text-xs' key={likeBy}>
                          <span className='underline'>{username(likeBy)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {user.id === blog.user ? (
                    <button
                      className='px-3 py-1 mt-2 rounded-md bg-red-500 text-white hover:scale-95 duration-300 ease-in-out'
                      onClick={() => deleteBlog(blog.id)}
                    >
                    Remove
                    </button>
                  ) : ''}
                </>
              ) : null}
            </Togglable>
          </div>
        ))
      )}
    </div>
  )
}

export default Blogs