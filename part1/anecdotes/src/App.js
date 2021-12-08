import { useState } from "react";

function App() {
	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
	];

	const points = Array(anecdotes.length).fill(0);

	const [selected, setSelected] = useState(0);
	const [vote, setVote] = useState(points);

	let randomNum = Math.floor(Math.random() * anecdotes.length);

	const numberGenerator = () => {
		setSelected(randomNum);
	};

	let maxNum = Math.max(...vote);
	let maxInd = vote.indexOf(maxNum);

	const voting = () => {
		const copy = [...vote];
		copy[selected] += 1;
		setVote(copy);
	};

	return (
		<div style={{ padding: "10px" }}>
			<h1 style={{ textDecoration: "underline" }}>Anecdote of the day</h1>
			<h3 style={{ marginTop: "5px" }}>{anecdotes[selected]}</h3>
			<p>has {vote[selected]} votes</p>
			<div style={{ marginTop: "10px" }}>
				<button
					onClick={voting}
					style={{ padding: "10px", margin: "0px 5px" }}
				>
					Vote
				</button>
				<button
					onClick={numberGenerator}
					style={{ padding: "10px", margin: "0px 5px" }}
				>
					Next Anecdote
				</button>
			</div>
			<h1 style={{ marginTop: "15px", textDecoration: "underline" }}>
				Anecdote with most votes
			</h1>
			<h3 style={{ marginTop: "5px" }}>{anecdotes[maxInd]}</h3>
			<p>has {maxNum} votes</p>
		</div>
	);
}

export default App;
