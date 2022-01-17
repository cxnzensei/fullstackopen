import { searchFunc } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

function Filter() {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    let key = event.target.value
    dispatch(searchFunc(key))
  }
  const style = {
    marginBottom: 20,
  }

  return (
    <div>
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    </div>
  )
}

export default Filter
