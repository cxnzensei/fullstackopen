function Notification({ notification }) {
	return (
		<div
			className="notification"
			style={{ color: `${notification.color}` }}
		>
			<div>{notification.message}</div>
		</div>
	);
}

export default Notification;
