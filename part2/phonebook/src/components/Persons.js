function Persons({ filter, people, deleteContact }) {
	let filteredContacts = people.filter((person) =>
		person.name.toLowerCase().includes(filter.toLowerCase())
	);
	return (
		<div>
			{filteredContacts.length === 0 ? (
				<p>Nothing to show</p>
			) : (
				filteredContacts
					.sort((a, b) =>
						a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
					)
					.map((person) => (
						<div
							key={person.id}
							style={{
								display: "flex",
								marginBottom: "15px",
								alignItems: "center",
							}}
						>
							<h4>{person.name}</h4>
							<p>{person.number}</p>
							<button
								onClick={() =>
									deleteContact(person.name, person.id)
								}
							>
								delete
							</button>
						</div>
					))
			)}
		</div>
	);
}

export default Persons;
