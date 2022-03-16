/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import EditBirth from './EditBirth'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data?.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token ? (
        <EditBirth />
      ) : (
        null
      )}
    </div>
  )
}

export default Authors