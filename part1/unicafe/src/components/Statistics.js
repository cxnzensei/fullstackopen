import StatisticLine from "./StatisticLine";
function Statistics({ data: { good, neutral, bad } }) {
	let total = good + neutral + bad;
	return (
		<div>
			<h1>Statistics</h1>
			{total === 0 ? (
				<h3>No Feedback Given</h3>
			) : (
				<table style={{ marginLeft: "-10px" }}>
					<tbody>
						<StatisticLine text="good" value={good} />
						<StatisticLine text="neutral" value={neutral} />
						<StatisticLine text="bad" value={bad} />
						<StatisticLine text="all" value={total} />
						<StatisticLine
							text="average"
							value={(good + bad - neutral) / total}
						/>
						<StatisticLine
							text="positive"
							value={`${(good / total) * 100} %`}
						/>
					</tbody>
				</table>
			)}
		</div>
	);
}

export default Statistics;
