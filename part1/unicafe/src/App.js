import { useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import Statistics from "./components/Statistics";

function App() {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	let data = { good, neutral, bad };

	return (
		<div style={{ padding: "20px" }}>
			<Header text="Give Feedback" />
			<div style={{ display: "flex" }}>
				<Button handleClick={() => setGood(good + 1)} text="good" />
				<Button
					handleClick={() => setNeutral(neutral + 1)}
					text="neutral"
				/>
				<Button handleClick={() => setBad(bad + 1)} text="bad" />
			</div>
			<Statistics data={data} />
		</div>
	);
}

export default App;
