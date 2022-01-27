import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlogLikes, deleteBlog, updateBlogComments } from '../reducers/blogReducer'
import { useState } from 'react'
import uniqid from 'uniqid'
import { addNotif } from '../reducers/notificationReducer'

const Blog = () => {
  const [comment, setComment] = useState('')
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const users = useSelector(state => state.users)
  const findUser = (userId) => {
    let user = users.find(user => user.id === userId)
    return user?.username
  }
  const ID = useParams().id
  const blog = blogs.find(blog => blog.id === ID)

  const updateLikes = (ID) => {
    let blogLike = blog
    if (blogLike.likedBy.includes(auth.id)) {
      blogLike.likedBy = blogLike.likedBy.filter((ids) => ids !== auth.id)
    } else {
      blogLike.likedBy.push(auth.id)
    }
    dispatch(updateBlogLikes(ID, blogLike))
  }

  const updateComments = (ID, comment) => {
    let blogComment = blog
    if(comment) {
      let obj = {
        comment,
        user: auth.id,
        coId: uniqid(),
        date: Date.now()
      }
      blogComment.comments.push(obj)
      dispatch(updateBlogComments(ID, blogComment))
      setComment('')
    }
    else(
      dispatch(addNotif('Comment cannot be blank', 5, 'red'))
    )
  }

  return (
    <div>
      {blog ? (
        <div className='my-4 lg:flex'>
          <div className='lg:w-6/12'>
            <div className='border shadow-md rounded-md'>
              <div className='p-3 border-b-2'>
                <div className='space-y-1'>
                  <div className='text-xl break-all md:text-2xl'>{blog?.title}</div>
                  <div className='text-sm break-all'>Authored by {blog?.author}</div>
                  <div className='text-xs md:text-sm'>Posted by{' '}
                    <Link className='underline underline-offset-2' to={`/users/${blog?.user}`}>{findUser(blog?.user)}</Link>
                  </div>
                  <div className='text-xs'>
                    on{' '}
                    {new Date(blog?.date).toLocaleDateString()}
                  </div>
                  <div className='text-xs'>
                    at{' '}
                    {new Date(blog?.date).toLocaleTimeString()}
                  </div>
                  <div className='space-x-2'>
                    <button
                      onClick={() => updateLikes(blog.id)}
                      className={
                        blog.likedBy.includes(auth.id)
                          ? 'px-3 py-1 mt-1 pr-4 rounded-md text-base bg-slate-700 text-white hover:scale-95 duration-300 ease-in-out max-w-fit'
                          : 'text-base px-3 mt-1 py-1 pr-4 bg-slate-200 rounded-md hover:scale-95 duration-300 ease-in-out max-w-fit'
                      }
                    >
                  &#128077;{blog.likedBy.length}
                    </button>
                    {auth.id === blog.user ? (
                      <button
                        className='px-3 py-1 mt-2 rounded-md bg-red-500 text-white hover:scale-95 duration-300 ease-in-out'
                        onClick={() => {
                          let conf = window.confirm(`Remove >> ${blog.title} by ${blog.author}?`)
                          if (conf) {
                            dispatch(deleteBlog(blog.id, blog.title, blog.author))
                          }
                        }}
                      >
                      Remove
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className='border-b-2 p-3'>
              &#8635;{' '}
                <span className='hover:underline break-all hover:text-gray-900 text-gray-500 cursor-pointer'>
                  <a href={`${blog?.url}`} target='_blank' rel="noreferrer">
                    {blog?.url.length > 30 ? blog?.url.substring(0, 30)+'...' : blog?.url}
                  </a>
                </span>
              </div>
              <div className='break-all items-center p-3'>
                <div className='text-xs md:text-sm'>
                  {blog.likedBy.length === 0 ? 'Be the first person to like this' : 'Liked by'}
                </div>
                <div className='flex break-all my-1 space-x-[3px]'>
                  {blog?.likedBy.map(user => (
                    <Link key={user} to={`/users/${user}`}>
                      <div className='flex underline underline-offset-2 text-xs md:text-sm'>
                        {findUser(user)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className='my-4 border shadow-md rounded-lg flex'>
              <div className='w-10/12'>
                <input value={comment} onChange={({ target }) => setComment(target.value)} className='outline-none w-full border-r p-3 bg-transparent' placeholder={`Comment as ${auth?.username}`} type="text" />
              </div>
              <div className='flex hover:bg-black hover:rounded-r-md w-2/12 duration-300 ease-out'>
                <button type='submit' onClick={() => updateComments(blog.id, comment)} className='w-full hover:text-white'>Add</button>
              </div>
            </div>
            <div>
              <div className='text-2xl'>{blog.comments.length === 0 ? 'No comments yet' : 'Comments'}</div>
              <div className={`my-2 break-words rounded-md px-3 py-2 ${blog.comments.length !== 0 && 'bg-gray-400'} max-h-[14.5rem] overflow-y-scroll scrollbar_hide`}>
                {blog.comments.sort((a,b) => a.date > b.date ? -1 : 1).map(el => (
                  <div key={el.coId} className='my-2 border p-3 rounded bg-zinc-100'>
                    <div className='space-x-2'>
                      <Link to={`/users/${el.user}`} className='font-bold text-base max-w-max text-gray-600'>
                        {findUser(el.user)}
                      </Link>
                      <span>
                        {el.comment}
                      </span>
                    </div>
                    <div className='text-xs'>
                      {new Date(el.date).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='hidden max-w-screen-sm -mt-14 lg:w-6/12 lg:inline-block'>
            <img className='rotate-90 h-min' src="/images/2.png" alt="blogs" />
          </div>
        </div>
      ) : (
        <div className='my-5 p-4 border max-w-fit rounded-lg'>
            This Blog has been Deleted
          <Link to='/'>
            <div className='text-2xl hover:text-gray-500 hover:underline'>
            &#8592; Go Back
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Blog