/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'
import { useQuery } from '@apollo/client'

const Books = ({ show, genre, setGenre }) => {
  const books = useQuery(ALL_BOOKS, { variables: { genre } })
  const [genresList, setGenresList] = useState([])

  books.data?.allBooks.map(a => a.genres.map(genre => {
    if(!genresList.includes(genre)) {
      setGenresList(genresList.concat(genre))
    }
  }))

  if (!show) {
    return null
  }


  return (
    <div>
      <h2>books</h2>
      {genre && (
        <div>in genre <span style={{ fontWeight: 'bold' }}>{genre}</span></div>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data?.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genresList.map(genre => (
          <button onClick={() => setGenre(genre)} key={genre}>{genre}</button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books