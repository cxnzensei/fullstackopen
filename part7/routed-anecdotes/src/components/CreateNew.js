import { useField } from '../hooks'

export const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const reset = () => {
    content.setValue('')
    author.setValue('')
    info.setValue('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.value && author.value && info.value) {
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0,
      })
      reset()
    } else {
      props.setNotification('One or more fields missing')
      setTimeout(() => {
        props.setNotification('')
      }, 5000)
    }
  }

  const handleReset = (e) => {
    e.preventDefault()
    reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}
