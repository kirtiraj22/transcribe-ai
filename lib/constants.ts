export const plansMap = [
	{
		id: "basic",
		name: "Basic",
		description: "Get started with TranscribeAI!",
		price: "10",
		items: ["3 Blog Posts", "3 Transcription"],
		paymentLink: "https://buy.stripe.com/test_aEUbLVe0V06B064bII",
		priceId:
			process.env.NODE_ENV === "development"
				? "price_1Nxq8qEZq07q777777777777"
				: "",
	},
	{
		id: "pro",
		name: "Pro",
		description: "All Blog Posts, let's go!",
		price: "19.99",
		items: ["unlimited Blog Posts", "Unlimited Transcriptions"],
		paymentLink: "https://buy.stripe.com/test_aEUbLVe0V06B064bII",
		priceId:
			process.env.NODE_ENV === "development"
				? "price_1Nxq8qEZq07q777777777777"
				: "",
	},
];

export const ORIGIN_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";