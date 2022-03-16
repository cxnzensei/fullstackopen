import { useMutation, useQuery } from '@apollo/client'
import { AUTHOR_NAMES, ALL_AUTHORS, EDIT_BIRTH } from '../queries'
import { useState } from 'react'

const EditBirth = () => {
  const [born, setBorn] = useState('')
  const [name, setName] = useState('')
  const data = useQuery(AUTHOR_NAMES)
  const [editBirth] = useMutation(EDIT_BIRTH, { refetchQueries: [{ query: ALL_AUTHORS }]})
  const submitEdit = (e) => {
    e.preventDefault()

    editBirth({
      variables: {
        name, born: parseInt(born) 
      } 
    })
    setBorn('')
    setName('')
  }
  return (
    <div style={{ marginTop:'20px' }}>
      <form onSubmit={submitEdit}>
        <select onChange={(e) => setName(e.target.value)}>
          {data?.data?.allAuthors.map(name => (
            <option key={name.id} value={name.name}>{name.name}</option>
          ))}
        </select>
        <div>
            Born <input value={born} type="text" onChange={(e) => setBorn(e.target.value)} />
        </div>
        <button type='submit'>Edit</button>
      </form>
    </div>
  )
}

export default EditBirth
