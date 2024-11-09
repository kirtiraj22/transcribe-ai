import Stripe from "stripe";
import getDbConnection from "./db";

export async function handleCheckoutSessionCompleted({
	session,
	stripe,
}: {
	session: Stripe.Checkout.Session;
	stripe: Stripe;
}) {
	const customerId = session.customer as string;
	const customer = await stripe.customers.retrieve(customerId);
	const priceId = session.line_items?.data[0].price?.id;
	console.log("customer : ", customer);
	console.log("priceId of customer: ",priceId);
	const sql = await getDbConnection();

	if ("email" in customer && priceId) {
		await createOrUpdateUser(sql, customer, customerId);
		await updateUserSubscription(sql, priceId, customer.email as string);
		await insertPayment(sql, session, priceId, customer.email as string);
		console.log("Checkout session completed!")
	}
}

export async function handleSubscriptionDeleted({
	subscriptionId,
	stripe,
}: {
	subscriptionId: string;
	stripe: Stripe;
}) {
	try {
		const subscription = await stripe.subscriptions.retrieve(
			subscriptionId
		);
		const sql = await getDbConnection();
		await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer}`;
	} catch (err) {
		console.error(
			"Error while handling stripe subscription deletion!",
			err
		);
		throw err;
	}
}

async function createOrUpdateUser(
	sql: any,
	customer: Stripe.Customer,
	customerId: string
) {
	try {
		const user =
			await sql`SELECT * FROM users WHERE email = ${customer.email}`;
		if (user.length === 0) {
			console.log("Inserting User in DB!")
			await sql`INSERT INTO users (email, full_name, customer_id) VALUES (${customer.email}, ${customer.name}, ${customerId})`;
			console.log("User inserted in table!")
		}
	} catch (err) {
		console.error("Error in inserting user", err);
	}
}

async function insertPayment(
	sql: any,
	session: Stripe.Checkout.Session,
	priceId: string,
	customerEmail: string
) {
	try {
		await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) VALUES (${session.amount_total}, ${session.status}, ${session.id}, ${priceId}, ${customerEmail})`;
	} catch (err) {
		console.error("Error while inserting payment", err);
	}
}

async function updateUserSubscription(
	sql: any,
	priceId: string,
	email: string
) {
	try {
		await sql`UPDATE users SET price_id = ${priceId}, status = 'active' where email = ${email}`;
	} catch (err) {
		console.error("Error while updating user!", err);
	}
}
