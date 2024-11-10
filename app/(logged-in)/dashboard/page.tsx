import BgGradient from "@/components/common/bg-gradient";
import { Badge } from "@/components/ui/badge";

export default async function Dashboard() {

	return (
		<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <BgGradient />
			<div className="flex flex-col items-center justify-center gap-6 text-center">
				<Badge className="group bg-gradient-to-r from-purple-700 to-pink-800 text-white px-6 py-1 text-lg font-semibold hover:bg-gradient-to-r">
					{/* {planTypeName} Plan */}
                    Basic Plan
				</Badge>
                <h2 className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Start creating amazing content</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">Upload your audio or video file and let our AI do the magic!</p>

                <p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
                    You get{" "}
                    <span className="font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-md">3 blog posts</span>
                    as part of the{" "}
                    <span className="font-bold capitalize">Basic </span>Plan.
                </p>
			</div>
		</div>
	);
}
