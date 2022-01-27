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
          className='mt-2 px-4 py-2 text-2xl bg-black text-slate-50 rounded-md hover:scale-95 duration-300 ease-in-out'
          onClick={toggleVisibility}
        >
          {firstButton}
        </button>
      </div>
      <div className='relative' style={showWhenVisible}>
        <div>{children}</div>
        <button
          className='px-4 py-2 ml-4 bottom-[17px] left-[5.5rem] absolute bg-gray-400 rounded-md hover:scale-95 duration-300 ease-in-out'
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
  lastButton: PropTypes.string.isRequired
}
