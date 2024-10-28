import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
	const payload = await req.text();
	const sig = req.headers.get("stripe-signature");

	let event;

	try {
		event = stripe.webhooks.constructEvent(
			payload,
			sig!,
			process.env.STRIPE_WEBHOOK_SECRET!
		);

		switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntentSucceeded = event.data.object;
                console.log({ paymentIntentSucceeded })
            }

			case "checkout.session.completed": {
				const session = await stripe.checkout.sessions.retrieve(
					event.data.object.id,
					{
						expand: ["line_items"],
					}
				);
				console.log({session});
                break;
			}

            case "customer.subscription.deleted": {
                const subscriptionId = event.data.object.id;
                const subscription = await stripe.subscriptions.retrieve(subscriptionId)
                console.log(subscription)
                break;
            }
            default: 
                console.log(`Unhandled event type: ${event.type}`)
		}

        return NextResponse.json({
            status: "success",
        })
	} catch (error) {
		console.log(error);
	}
}