import Weather from "./Weather";

function Country({ name, capital, population, languages, flag }) {
	return (
		<div>
			<h2>{name}</h2>
			<p>Capital - {capital}</p>
			<p>Population - {population}</p>
			<h4>Languages</h4>
			{Object.keys(languages).map((language, i) => {
				return <li key={i}>{languages[language]}</li>;
			})}
			<img
				src={flag}
				style={{
					width: "200px",
					border: "1px solid black",
				}}
				alt={name}
			/>
			<Weather name={capital} />
		</div>
	);
}

export default Country;
