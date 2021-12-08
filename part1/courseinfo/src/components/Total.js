function Total({ total }) {
	let sum = total.reduce((acc, item) => {
		return acc + item.exercises;
	}, 0);

	return <p>number of exercises {sum}</p>;
}

export default Total;
