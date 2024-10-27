import BgGradient from "@/components/common/bg-gradient";
import Divider from "@/components/common/divider";
import Banner from "@/components/home/banner";
import Pricing from "@/components/home/pricing";
import WorkFlow from "@/components/home/workflow";

export default function Home() {
	return (
		<main className="mx-auto inset-0 h-full bg-[radial-gradient(#e5e7eb_1px, transparent_1px)] [background-size:16px_16px]">
			<BgGradient />
			<Banner />
			<Divider />
			<WorkFlow />
			<Divider />
			<Pricing />
			<Divider />
		</main>
	);
}
