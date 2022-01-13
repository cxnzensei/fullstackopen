import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const signUp = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getAllUsers = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

export default { signUp, getAllUsers }