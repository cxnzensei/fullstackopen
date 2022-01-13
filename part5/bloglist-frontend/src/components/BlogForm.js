import { PropTypes } from 'prop-types'

function BlogForm({
  addBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) {
  return (
    <div>
      <form onSubmit={addBlog}>
        <h3 className='text-xl underline mb-3'>Create a New Blog</h3>
        <div>
          Title
          <input
            id='title'
            className='border mx-2 outline-none px-2 rounded-sm mb-2'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          Author
          <input
            id='author'
            className='border mx-2 outline-none px-2 rounded-sm mb-2'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          URL
          <input
            id='url'
            className='border mx-2 outline-none px-2 rounded-sm'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  setAuthor: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
}
