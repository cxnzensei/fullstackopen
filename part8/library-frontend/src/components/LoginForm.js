/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({
  setToken, setError, show, setPage 
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (err) => {
      setError(err.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if(result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])

  const reset = () => {
    setPassword('')
    setUsername('')
  }

  const submit = async (e) => {
    e.preventDefault()
    if(username && password) {
      login({
        variables:{
          username, password 
        } 
      })
      reset()
    }
    setPage('authors')
  }

  if(!show) {
    return null
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
        Username <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
        </div>
        <div>
        Password <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
