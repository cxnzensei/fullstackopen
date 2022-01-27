import { signUp } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { addNotif } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import { useField } from '../hooks'
import { Link } from 'react-router-dom'

function SignUpForm() {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  const fullName = useField('text')
  const pass = useField('password')
  const userName = useField('text')

  const reset = () => {
    fullName.setValue('')
    pass.setValue('')
    userName.setValue('')
  }

  const isInvalid = (!fullName || !pass || !userName)

  const handleSignUp = (e) => {
    const name = fullName.value
    const password = pass.value
    const username = userName.value

    e.preventDefault()
    if(name.length >= 2 && password.length >= 5 && username.length >= 2) {
      if(!(users.find((user) => user.username === username))) {
        dispatch(signUp({ name, password, username }))
      }
      else {
        dispatch(addNotif('Username is already taken, try another username', '5', 'red'))
      }
    }
    else {
      dispatch(addNotif('Min lengths - fullname(2), username(2) and password(5)', 5, 'red'))
    }
    reset()
  }
  return (
    <div className="container flex mx-auto max-w-screen-md -mt-[150px] lg:items-center justify-center sm:h-screen">
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

          <form onSubmit={handleSignUp}>
            <input
              aria-label="Enter your Full Name"
              placeholder="Fullname"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary outline-none rounded mb-2"
              type={fullName.type}
              value={fullName.value}
              onChange={fullName.onChange}
            />
            <input
              aria-label="Enter your User Name"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary outline-none rounded mb-2"
              type={userName.type}
              value={userName.value}
              onChange={userName.onChange}
            />
            <input
              aria-label="Enter your Password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary outline-none rounded mb-2"
              type={pass.type}
              onChange={pass.onChange}
              value={pass.value}
            />
            <button
              disabled={isInvalid}
              className={`bg-blue-400 text-white w-full rounded h-8 font-bold
							${isInvalid && 'opacity-50'}`}
              type="submit"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full rounded bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Already have an account?{' '}
            <Link
              to='/login'
              className="font-bold text-blue-medium"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
