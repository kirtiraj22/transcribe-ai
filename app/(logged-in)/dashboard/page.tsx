import BgGradient from "@/components/common/bg-gradient";
import getDbConnection from "@/lib/db";
import {
	doesUserExist,
	getPlanType,
	hasCancelledSubscription,
	updateUser,
} from "@/lib/user-helpers";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import UpgradePlan from "@/components/upload/upgradePlan";
import UploadForm from "@/components/upload/upload-form";

export default async function Dashboard() {
	const clerkUser = await currentUser();

	if (!clerkUser) {
		return redirect("/sign-in");
	}

	const email = clerkUser?.emailAddresses?.[0].emailAddress ?? "";

	const sql = await getDbConnection();

	let userId = null;
	let priceId = null;

	const hasUserCancelled = await hasCancelledSubscription(sql, email);
	const user = await doesUserExist(sql, email);
	// console.log("User : ", user);
	if (user) {
		userId = clerkUser?.id;
		if (userId) {
			await updateUser(sql, userId, email);
		}

		priceId = user[0].price_id;
	}

	const { id: planTypeId = "starter", name: planTypeName } =
		getPlanType(priceId);

	const isBasicPlan = planTypeId === "basic";
	const isProPlan = planTypeId === "pro";
	
	return (
		<div className="mx-auto max-w-7xl px-6 py-22 sm:py-32 lg:px-8 overflow-hidden max-h-[80vh]">
			<BgGradient/>
			<div className="flex flex-col items-center justify-center gap-6 text-center">
				<Badge className="group bg-gradient-to-r from-purple-700 to-pink-800 text-white px-6 py-1 text-lg font-semibold hover:bg-gradient-to-r">
					{planTypeName} Plan
				</Badge>
				<h2 className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Start creating amazing content
				</h2>
				<p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
					Upload your audio or video file and let our AI do the magic!
				</p>
				{(isBasicPlan || isProPlan) && (
					<p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
						You get{" "}
						<span className="font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-md">
							{isBasicPlan ? "3" : "Unlimited"} blog posts
						</span>
						as part of the{" "}
						<span className="font-bold capitalize">
							{planTypeName}{" "}
						</span>
						Plan.
					</p>
				)}
				<UpgradePlan />
				<UploadForm />
			</div>
		</div>
	);
}
