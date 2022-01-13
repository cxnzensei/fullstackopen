import PropTypes from 'prop-types'

function LoginForm({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) {
  return (
    <div className='border p-2 max-w-lg rounded bg-yellow-50 duration-300 ease-in-out'>
      <form onSubmit={handleLogin}>
        <div className='text-xl mb-2'>
          username
          <input
            className='border text-gray-600 mx-2 px-2 text-lg rounded-md outline-none'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className='text-xl flex items-center mb-2'>
          password
          <input
            className='border mx-2 outline-none px-2 rounded-md'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className='bg-red-300 px-4 py-2 rounded-md hover:scale-95 duration-300 ease-in-out' type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
}
