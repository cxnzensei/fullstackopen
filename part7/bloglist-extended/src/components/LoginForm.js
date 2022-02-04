import { login } from '../reducers/authReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'
import { Link } from 'react-router-dom'

function LoginForm() {
  const history = useHistory()
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const reset = () => {
    username.setValue('')
    password.setValue('')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login(username.value, password.value))
    reset()
    history.push('/')
  }

  const isInvalid = (!username.value || !password.value)

  return (
    <div className="container flex mx-auto max-w-screen-md md:-mt-10 lg:items-center justify-center sm:h-screen">
      <div className="flex lg:w-3/5">
        <img
          className="max-w-full hidden lg:inline-block"
          src="/images/2.png"
          alt="blogs"
        />
      </div>
      <div className="flex flex-col md:w-2/5 sm: w-72 sm: mt-40 lg: mb-40">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary rounded mb-4">
          <h1 className="flex justify-center w-full mb-3">
            <img
              src="/images/1.png"
              alt="logo"
              className="mt-2 w-6/12"
            />
          </h1>

          <form onSubmit={handleLogin}>
            <input
              aria-label="Enter your User Name"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary outline-none rounded mb-2"
              type={username.type}
              onChange={username.onChange}
              value={username.value}
            />
            <input
              aria-label="Enter your Password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary outline-none rounded mb-2"
              type={password.type}
              onChange={password.onChange}
              value={password.value}
            />

            <button
              disabled={isInvalid}
              className={`bg-blue-400 text-white w-full rounded h-8 font-bold
							${isInvalid && 'opacity-50'}`}
              type="submit"
              onClick={handleLogin}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full rounded bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to='/signUp'
              className="font-bold text-blue-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm