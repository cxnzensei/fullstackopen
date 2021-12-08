function Part({ name, exercises }) {
	return (
		<div style={{ fontSize: "20px", marginTop: "10px" }}>
			<p>
				{name} {exercises}
			</p>
		</div>
	);
}

export default Part;
