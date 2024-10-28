export const plansMap = [
	{
		id: "basic",
		name: "Basic",
		description: "Get started with TranscribeAI!",
		price: "840",
		items: ["3 Blog Posts", "3 Transcription"],
		paymentLink: "https://buy.stripe.com/test_6oEdSK9zpbwG5Zm000",
		priceId:
			process.env.NODE_ENV === "development"
				? "price_1QEmfmSHDuqZovb7mreRB9A7"
				: "",
	},

	{
		id: "pro",
		name: "Pro",
		description: "All Blog Posts, let's go!",
		price: "1680",
		items: ["unlimited Blog Posts", "Unlimited Transcriptions"],
		paymentLink: "https://buy.stripe.com/test_8wM01U26XfMW4Vi8wx",
		priceId:
			process.env.NODE_ENV === "development"
				? "price_1QEmhcSHDuqZovb7Ev6GlWD8"
				: "",
	},
];

export const ORIGIN_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";