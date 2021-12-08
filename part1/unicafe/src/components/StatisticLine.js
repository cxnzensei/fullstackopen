function StatisticLine({ text, value }) {
	return (
		<tr>
			<th
				style={{
					padding: "10px",
					textAlign: "left",
				}}
			>
				{text}
			</th>
			<td
				style={{
					padding: "10px",
					textAlign: "left",
				}}
			>
				{value}
			</td>
		</tr>
	);
}

export default StatisticLine;
