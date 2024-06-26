import { useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

export default function App() {
	const SECTION_IDS = ["1", "2", "3", "4", "5"];
	const [activeSection, setActiveSection] = useState("");
	const [thresholdLevel, setThresholdLevel] = useState("50");

	return (
		<main>
			{SECTION_IDS.map((id) => (
				<Section
					id={id}
					setActiveSection={setActiveSection}
					thresholdLevel={thresholdLevel}
				/>
			))}
			<div className="fixed top-5 left-20 p-3 rounded bg-white/30">
				active section: {activeSection}
				<fieldset>
					<select
						value={thresholdLevel}
						onChange={(e) => setThresholdLevel(e.currentTarget.value)}
					>
						<option value="30">30% from top</option>
						<option value="50">50% from top</option>
					</select>
				</fieldset>
			</div>
			<div
				className="fixed inset-0 border-t-4 border-dashed border-black transition-transform duration-300 ease-in-out"
				style={{ transform: `translateY(${thresholdLevel}%)` }}
			/>
		</main>
	);
}

const Section = ({
	id,
	setActiveSection,
	thresholdLevel,
}: {
	id: string;
	setActiveSection: (id: string) => void;
	thresholdLevel: string;
}) => {
	const rootMargins: Record<string, string> = {
		30: "-30% 0px -70%",
		50: "-50% 0px -50%",
	};
	const { ref, isIntersecting } = useIntersectionObserver({
		rootMargin: rootMargins[thresholdLevel],
		threshold: 0,
	});

	useEffect(() => {
		if (isIntersecting) {
			setActiveSection(id);
		}
	}, [id, setActiveSection, isIntersecting]);

	return (
		<section
			ref={ref}
			className="h-[70vh] grid place-items-center [&:nth-child(1)]:bg-rose-500 [&:nth-child(2)]:bg-orange-500 [&:nth-child(3)]:bg-yellow-500 [&:nth-child(4)]:bg-blue-500 [&:nth-child(5)]:bg-purple-500"
		>
			{id}
		</section>
	);
};
