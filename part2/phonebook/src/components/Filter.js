function Filter({ setFilter }) {
	return (
		<div style={{ paddingTop: "25px" }}>
			filter shown with -{" "}
			<input
				style={{ outline: "none" }}
				onChange={(e) => setFilter(e.target.value)}
			/>
		</div>
	);
}

export default Filter;
