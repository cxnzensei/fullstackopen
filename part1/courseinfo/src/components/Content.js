import Part from "./Part";

function Content({ content }) {
	return (
		<>
			{content.map((item, index) => (
				<Part key={index} data={item} />
			))}
		</>
	);
}

export default Content;
