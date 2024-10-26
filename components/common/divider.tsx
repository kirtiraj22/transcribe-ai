import { Dot } from "lucide-react";

export default function Divider() {
	return (
		<div className="flex items-center justify-center">
			<Dot className="text-indigo-400 hover:scale-150 transition duration-200 hover:text-purple-700"></Dot>
			<Dot className="text-indigo-400 hover:scale-150 transition duration-200 hover:text-purple-700"></Dot>
			<Dot className="text-indigo-400 hover:scale-150 transition duration-200 hover:text-purple-700"></Dot>
		</div>
	);
}
