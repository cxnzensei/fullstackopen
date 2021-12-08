function Search({ search, setSearch }) {
	return (
		<div>
			find countries{" "}
			<input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				style={{ outline: "none" }}
			/>
		</div>
	);
}

export default Search;
