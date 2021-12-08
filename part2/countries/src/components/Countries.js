import Country from "./Country";
import MultipleCountries from "./MultipleCountries";

function Countries({ search, countries, setSearch }) {
	let filters =
		search &&
		countries.filter((country) =>
			country.name.common.toLowerCase().includes(search.toLowerCase())
		);

	if (filters.length > 10) {
		return <div>Too many matches, specify another filter</div>;
	}

	if (search && filters.length === 0) {
		return <h4>No results found</h4>;
	}

	if (filters.length > 1) {
		return (
			<div>
				{filters.map((country) => (
					<MultipleCountries
						key={country.name.common}
						name={country.name.common}
						setSearch={setSearch}
					/>
				))}
			</div>
		);
	}

	return (
		<div>
			{search &&
				filters.map((country) => (
					<Country
						key={country.name.common}
						name={country.name.common}
						capital={country.capital}
						population={country.population}
						languages={country.languages}
						flag={country.flags.png}
					/>
				))}
		</div>
	);
}

export default Countries;
