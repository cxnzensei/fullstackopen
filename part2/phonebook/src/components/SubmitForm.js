function SubmitForm({
	addToTheBook,
	newName,
	setNewName,
	number,
	setNewNumber,
}) {
	return (
		<form onSubmit={addToTheBook}>
			<h1>Add a new contact</h1>
			<div>
				Name :{" "}
				<input
					style={{ outline: "none" }}
					value={newName}
					onChange={(e) => setNewName(e.target.value)}
				/>
			</div>
			<div>
				Number:{" "}
				<input
					style={{ outline: "none" }}
					value={number}
					onChange={(e) => setNewNumber(e.target.value)}
				/>
			</div>
			<div>
				<button type="submit">Add</button>
			</div>
		</form>
	);
}

export default SubmitForm;
