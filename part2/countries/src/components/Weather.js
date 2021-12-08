import { useEffect, useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

function Weather({ name }) {
	const [weatherData, setWeatherData] = useState([]);

	useEffect(() => {
		console.log("weather");
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api_key}`
			)
			.then((response) => {
				console.log("promise fulfilled");
				setWeatherData([response.data]);
			})
			.catch((err) => console.log(err));
	}, [name]);

	let iconCode = weatherData[0]?.weather[0]?.icon;
	let iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

	return (
		<div>
			<h3>Weather in {name}</h3>
			<div style={{ display: "flex" }}>
				<h4>temperature: </h4>
				<p>
					{(weatherData[0]?.main?.temp - 273.15).toFixed(2)} Celsius
				</p>
			</div>
			<img
				src={iconUrl}
				alt={name}
				style={{ border: "1px solid black" }}
			/>
			<div style={{ display: "flex" }}>
				<h4>wind: </h4>
				<p>{weatherData[0]?.wind?.speed}</p>
			</div>
		</div>
	);
}

export default Weather;
