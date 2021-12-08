import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

function Course({ course }) {
	return (
		<div>
			<h1 style={{ margin: "10px 0px" }}>Web Development Curriculum</h1>
			{course.map((item) => (
				<div style={{ marginBottom: "20px" }} key={item.id}>
					<Header text={item.name} />
					<Content parts={item.parts} />
					<Total total={item.parts} />
				</div>
			))}
		</div>
	);
}

export default Course;
