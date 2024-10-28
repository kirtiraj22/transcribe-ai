import Stripe from "stripe";
async function createOrUpdateUser(
	sql: any,
	customer: Stripe.Customer,
	customerId: string
) {
	try {
		const user =
			await sql`SELECT * FROM users WHERE email = ${customer.email}`;
		if (user.length === 0) {
			await sql`INSERT INTO users (email, full_name, customer_id) VALUES (${customer.email}, ${customer.name}, ${customerId}})`;
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
){
    try{
        await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) VALUES (${session.amount_total}, ${session.status}, ${session.id}, ${priceId}, ${customerEmail})`
    }catch(err){
        console.error("Error while inserting payment", err)
    }
}

async function updateUserSubscription(
    sql: any,
    priceId: string,
    email: string
){
    try{
        await sql`UPDATE users SET price_id = ${priceId}, status = 'active' where email = ${email}`;
    }catch(err){
        console.error("Error while updating user!", err)
    }
}