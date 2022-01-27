import axios from 'axios'
const baseUrl = 'https://blogs-nishit.vercel.app/api/users'

const signUp = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const specUser = (ID) => {
  const response = axios.get(`${baseUrl}/${ID}`)
  return response.data
}

export default { signUp, getAll, specUser }


