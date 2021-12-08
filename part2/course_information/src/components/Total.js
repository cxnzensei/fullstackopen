function Total({ total }) {
	let sum = total.reduce((acc, item) => {
		return acc + item.exercises;
	}, 0);
	return (
		<div style={{ marginTop: "15px" }}>
			<h3>Total of {sum} exercises</h3>
		</div>
	);
}

export default Total;
