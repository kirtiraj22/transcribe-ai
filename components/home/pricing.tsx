import { plansMap } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface PlanProps {
	name: string;
	description: string;
	price: string;
	items: string[];
	paymentLink: string;
	id: string;
}

export default function Pricing() {
	return (
		<section className="relative overflow-hidden" id="pricing">
			<div className="py-12 lg:py-24 max-w-5xl mx-auto px-12 lg:px-0">
				<div className="flex items-center justify-center w-full pb-12">
					<h2 className="font-bold text-xl uppercase mb-8 text-purple-600">
						Pricing
					</h2>
				</div>
				<div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
					{plansMap.map(
						(
							{
								name,
								price,
								description,
								items,
								paymentLink,
								id,
							}: PlanProps,
							idx
						) => (
							<div className="relative w-full max-w-lg" key={idx}>
								<div
									className={cn(
										"relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-2xl border-[1px] border-gray-500/20",
										id === "pro" &&
											"border-violet-500 gap-5 border-2"
									)}
								>
									<div className="flex justify-between items-center gap-4">
										<div>
											<p className="text-lg lg:text-xl font-bold capitalize">
												{name}
											</p>
											<p className="text-base-content/80 mt-2">
												{description}
											</p>
										</div>
									</div>
									<div className="flex gap-2">
										<p className="text-5xl tracking-tight font-extrabold">
											${price}
										</p>
										<div className="flex flex-col justify-end mb-[4px]">
											<p className="text-xs text-base-content/60 uppercase font-semibold">
												USD
											</p>
											<p className="text-xs text-base-content/60">
												/month
											</p>
										</div>
									</div>
									<ul className="space-y-2.5 leading-relaxed text-base flex-1">
										{items.map((item, index) => (
											<li
												className="flex items-center gap-2"
												key={index}
											>
												<CheckIcon size={18} />
												<span>{item}</span>
											</li>
										))}
									</ul>
									<div className="space-y-2">
										<Button
											variant="link"
											className={cn(
												"border-2 rounded-xl bg-black text-gray-100 shadow-lg hover:bg-black hover:no-underline relative after:bg-indigo-500 after:rounded-2xl after:absolute after:h-[4px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer",
												id === "pro" &&
													" border-amber-300 px-4 after:bg-amber-600"
											)}
										>
											<Link
												href={paymentLink}
												className="flex gap-1 items-center"
											>
												Get Transcribe AI
												<ArrowRight
													size={18}
													className="animate-pulse"
												/>
											</Link>
										</Button>
									</div>
								</div>
							</div>
						)
					)}
				</div>
			</div>
		</section>
	);
}
