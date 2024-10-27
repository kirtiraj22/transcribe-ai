import BgGradient from "@/components/common/bg-gradient";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return (
		<section className="flex h-[90vh] items-center justify-center">
            <BgGradient className="-z-10 bottom-0"/>
			<SignUp />
			<BgGradient />
		</section>
	);
}
