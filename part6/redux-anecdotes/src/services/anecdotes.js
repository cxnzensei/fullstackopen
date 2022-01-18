import axios from 'axios'
import uniqid from 'uniqid'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0, id: uniqid() }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const changeVote = async (ID) => {
  const data = await getAll()
  const anecToVote = data.find((anec) => anec.id === ID)
  anecToVote.votes = anecToVote.votes + 1
  const response = await axios.put(`${baseUrl}/${ID}`, anecToVote)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, changeVote }
