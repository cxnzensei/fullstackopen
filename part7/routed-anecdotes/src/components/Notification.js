export const Notification = ({ notification, setNotification }) => {
  return (
    <div
      style={{ border: '1px solid black', padding: '30px', marginTop: '20px' }}
    >
      {notification}
    </div>
  )
}
