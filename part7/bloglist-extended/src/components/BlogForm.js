import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { addNotif } from '../reducers/notificationReducer'
import { useField } from '../hooks'

function BlogForm() {
  const title1 = useField('text')
  const author1 = useField('text')
  const url1 = useField('text')

  const reset = () => {
    title1.setValue('')
    author1.setValue('')
    url1.setValue('')
  }

  const dispatch = useDispatch()
  const addBlog = async(e) => {
    e.preventDefault()
    const title = title1.value
    const author = author1.value
    const url = url1.value
    const content = { title, author, url }
    if(!title || !author || !url) {
      dispatch(addNotif('Some Contents are missing', 5, 'red'))
    }
    else {
      dispatch(createBlog(content))
      dispatch(addNotif(`A new blog ${title} by ${author} added`, 5, 'green'))
      reset()
    }
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h3 className='text-xl mb-3'>Create a New Blog</h3>
        <div className='text-sm md:text-base'>
          Title
          <input
            className='border mx-2 outline-none px-2 rounded-sm mb-2'
            type={title1.type}
            onChange={title1.onChange}
            value={title1.value}
          />
        </div>
        <div className='text-sm md:text-base'>
          Author
          <input
            className='border mx-2 outline-none px-2 rounded-sm mb-2'
            type={author1.type}
            onChange={author1.onChange}
            value={author1.value}
          />
        </div>
        <div className='text-sm md:text-base'>
          URL
          <input
            className='border mx-2 outline-none px-2 rounded-sm'
            type={url1.type}
            onChange={url1.onChange}
            value={url1.value}
          />
        </div>
        <button
          id='createBlog'
          className='bg-green-300 px-4 py-2 rounded-md mt-2'
          type='submit'
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
