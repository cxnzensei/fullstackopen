function Button({ handleClick, text }) {
	return (
		<div>
			<button
				onClick={handleClick}
				style={{ margin: "10px 5px", padding: "5px" }}
			>
				{text}
			</button>
		</div>
	);
}

export default Button;
