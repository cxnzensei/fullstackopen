import { useState } from 'react'
import PropTypes from 'prop-types'

function Togglable({ firstButton, lastButton, children }) {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          className='py-2 mt-2 bg-gray-400 px-4 rounded-md hover:scale-95 duration-300 ease-in-out'
          onClick={toggleVisibility}
        >
          {firstButton}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {children}
        </div>
        <button
          className='px-4 mt-2 py-2 bg-gray-400 rounded-md hover:scale-95 duration-300 ease-in-out'
          onClick={toggleVisibility}
        >
          {lastButton}
        </button>
      </div>
    </div>
  )
}

export default Togglable

Togglable.propTypes = {
  firstButton: PropTypes.string.isRequired,
  lastButton: PropTypes.string.isRequired,
}
