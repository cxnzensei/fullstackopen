import axios from 'axios'
const baseUrl = 'https://blogs-nishit.vercel.app/api/blogs'

let token = null
let config

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLikes = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const addComments = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, setToken, updateLikes, remove, addComments }
