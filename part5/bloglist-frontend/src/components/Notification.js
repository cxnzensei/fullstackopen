function Notification({ notification }) {
  return (
    <div
      className='h-11 my-3 flex items-center bg-gray-100 border-2 rounded-md px-2 border-gray-500'
      style={{ color: `${notification.color}` }}
    >
      <div>{notification.message}</div>
    </div>
  )
}

export default Notification
