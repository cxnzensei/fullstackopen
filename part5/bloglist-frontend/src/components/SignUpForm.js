import PropTypes from 'prop-types'

function SignUpForm({
  handleSignUp,
  username,
  setUsername,
  password,
  setPassword,
  name,
  setName
})
{
  return (
    <div className="border p-2 max-w-lg rounded bg-red-50">
      <form onSubmit={handleSignUp}>
        <div className='text-xl mb-2'>
          fullname
          <input
            className='border text-gray-600 mx-2 px-2 text-lg rounded-md outline-none'
            type='text'
            value={name}
            name='Fullname'
            onChange={({ target }) => setName(target.value)}
          />
        </div>
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
        <button id='loginButton' className='bg-red-300 px-4 py-2 rounded-md hover:scale-95 duration-300 ease-in-out' type='submit'>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUpForm

SignUpForm.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
}