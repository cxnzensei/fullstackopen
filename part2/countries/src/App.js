import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Countries from "./components/Countries";

function App() {
	const [search, setSearch] = useState("");
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		console.log("effect");
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			console.log("promise fulfilled");
			setCountries(response.data);
		});
	}, []);

	return (
		<div>
			<Search search={search} setSearch={setSearch} />
			<Countries
				search={search}
				countries={countries}
				setSearch={setSearch}
			/>
		</div>
	);
}

export default App;
