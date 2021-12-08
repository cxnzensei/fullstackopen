function MultipleCountries({ name, setSearch }) {
	return (
		<div key={name} style={{ display: "flex" }}>
			<h3>{name}</h3>
			<button onClick={() => setSearch(name)}>show more</button>
		</div>
	);
}

export default MultipleCountries;
