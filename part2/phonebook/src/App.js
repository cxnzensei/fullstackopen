import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import SubmitForm from "./components/SubmitForm";
import peopleService from "./services/people";
import Notification from "./components/Notification";

function App() {
	const [people, setPeople] = useState([]);
	const [newName, setNewName] = useState("");
	const [number, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [notification, setNotification] = useState({
		message: "",
		color: "",
	});

	useEffect(() => {
		peopleService.getAll().then((initialData) => {
			setPeople(initialData);
		});
	}, []);

	const addToTheBook = (event) => {
		event.preventDefault();
		if (newName.length >= 3 && number.length >= 8) {
			if (people.some((person) => person.name === newName)) {
				let addConf = window.confirm(
					`${newName} is already added to the phonebook. Do you want to update the number?`
				);
				if (addConf) {
					let updateContact = people.find(
						(person) => person.name === newName
					);
					let ID = updateContact.id;

					let objUpdate = {
						name: newName,
						id: updateContact.id,
						number: number,
					};
					peopleService.update(ID, objUpdate).then((returnedData) => {
						setPeople(
							people.map((person) =>
								person.id !== ID ? person : returnedData
							)
						);
					});
					setNewNumber("");
					setNewName("");
				}
			} else {
				let newObj = {
					name: newName,
					number: number,
				};
				peopleService.create(newObj).then((returnedData) => {
					setPeople(people.concat(returnedData));
				});
				setNotification({
					message: `${newName} added to phonebook`,
					color: "green",
				});
				setTimeout(() => {
					setNotification({
						message: "",
						color: "black",
					});
				}, 3000);
				setNewNumber("");
				setNewName("");
			}
		} else {
			setNotification({
				message: `minimum length for Name: 3, minimum length for Number: 8`,
				color: "red",
			});
		}
	};

	const deleteContact = (name, id) => {
		let delConf = window.confirm(`Delete ${name}`);
		if (delConf) {
			peopleService.erase(id).then(() => {
				setPeople(people.filter((person) => person.id !== id));
				setNotification({
					message: `information of ${name} has been removed from the server`,
					color: "red",
				});
				setTimeout(() => {
					setNotification({ message: "", color: "black" });
				}, 3000);
			});
		}
	};

	return (
		<div>
			<h1 style={{ marginTop: "-5px" }}>Phonebook</h1>
			<Notification notification={notification} />
			<Filter setFilter={setFilter} />
			<SubmitForm
				addToTheBook={addToTheBook}
				newName={newName}
				setNewName={setNewName}
				number={number}
				setNewNumber={setNewNumber}
			/>
			<h1>Numbers</h1>
			<Persons
				deleteContact={deleteContact}
				filter={filter}
				people={people}
				setNotification={setNotification}
			/>
		</div>
	);
}

export default App;
