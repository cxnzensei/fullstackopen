/* eslint-disable react/prop-types */

import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recs = (props) => {

  const me = useQuery(ME)
  let genre = me.data?.me?.favoriteGenre
  const recs = useQuery(ALL_BOOKS, { variables: { genre } })

  if(!props.show) {
    return null
  }

  return (
    <>
      <h2 style={{ fontWeight: 'bold' }}>recommendations</h2>
      <div>books in your favorite genre <span style={{ fontWeight: 'bold' }}>{genre}</span></div>
      {genre && (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {recs.data?.allBooks.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Recs
