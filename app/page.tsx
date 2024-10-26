import BgGradient from "@/components/common/bg-gradient";
import Banner from "@/components/home/banner";

export default function Home() {
	return (
		<main className="mx-auto inset-0 h-full bg-[radial-gradient(#e5e7eb_1px, transparent_1px)] [background-size:16px_16px]">
			<BgGradient />
      <Banner />
		</main>
	);
}
